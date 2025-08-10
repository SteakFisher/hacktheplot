import { auth } from "@/functions/auth";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { getOtp } from "@/actions/getOtp";
import RasputinClient from "@/components/rasputin-client";

export default async function Rasputin() {
  await auth(); // Ensure user is authenticated
  const otpResult = await getOtp();

  return (
    <BackgroundBeamsWithCollision>
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md mx-auto space-y-8">
          <RasputinClient initialOtpData={otpResult} />
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
