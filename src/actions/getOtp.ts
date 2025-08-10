"use server";

import { db } from "@/drizzle";
import { eq, and, gt } from "drizzle-orm";
import { otpTable } from "@/drizzle/schema";
import { Errors } from "@/classes/Errors";
import { auth } from "@/functions/auth";

export async function getOtp() {
  try {
    const payload = await auth();
    const now = new Date();

    // Check if user has an existing OTP that hasn't expired
    const existingOtp = await db.query.otpTable.findFirst({
      where: and(
        eq(otpTable.user_id, payload.id),
        gt(otpTable.expiry, now.toISOString()),
      ),
    });

    if (existingOtp) {
      const expiryTime = new Date(existingOtp.expiry);

      return {
        success: true,
        otp: existingOtp.otp.toString().padStart(6, "0"),
        expiryTime: existingOtp.expiry,
        remainingTime: Math.max(
          0,
          Math.floor((expiryTime.getTime() - now.getTime()) / 1000),
        ),
      };
    }

    // Generate new 6-digit OTP
    let newOtp: number;
    let isUnique = false;

    // Ensure OTP is unique
    while (!isUnique) {
      newOtp = Math.floor(100000 + Math.random() * 900000);

      const existingOtpWithSameCode = await db.query.otpTable.findFirst({
        where: eq(otpTable.otp, newOtp),
      });

      if (!existingOtpWithSameCode) {
        isUnique = true;
      }
    }

    // Set expiry to 2 minutes from now
    const expiryTime = new Date(now.getTime() + 2 * 60 * 1000);

    // Insert or update OTP
    await db
      .insert(otpTable)
      .values({
        user_id: payload.id,
        otp: newOtp!,
        expiry: expiryTime.toISOString(),
      })
      .onConflictDoUpdate({
        target: otpTable.user_id,
        set: {
          otp: newOtp!,
          expiry: expiryTime.toISOString(),
        },
      });

    return {
      success: true,
      otp: newOtp!.toString().padStart(6, "0"),
      expiryTime: expiryTime.toISOString(),
      remainingTime: 120, // 2 minutes in seconds
    };
  } catch (error: any) {
    if (error.message === "No token found") {
      return Errors.AuthError("Please login to access this page");
    }

    console.log(error);
    return Errors.DBError("Failed to generate OTP");
  }
}
