import AlbumCover from "@/components/AlbumCover";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-full py-6 px-4 overflow-hidden">
      {/* Main content container */}
      <div className="max-w-7xl mx-auto relative min-h-[100vh] flex flex-col items-center justify-center z-10">
        {/* Stationery with logo and mission statement */}
        <div className="mb-16 z-30">
          <div className="relative">
            <div className="relative bg-amber-50 p-6 pt-6 pb-6 shadow-xl z-10 w-[320px] md:w-[400px]">
              {/* Logo */}
              <div className="flex justify-center mb-4">
                <div className="relative w-[240px] h-[140px]">
                  <Image
                    src="/sheffield-logo.png"
                    alt="Sheffield Central Logo"
                    width={240}
                    height={140}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Decorative line */}
              <div className="w-full h-[1px] bg-purple-900/30 my-4"></div>

              {/* Mission statement in script font */}
              <div className="text-center">
                <p className="font-caveat text-2xl text-grey-900">
                  Preserving the architectural heritage of Sheffield, Alabama
                  through original artwork. Our mission isto celebrate the
                  historic homes and structures that define our beloved town's
                  character and history, one beautiful print at a time.
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-purple-800/20 rounded-tl-sm"></div>
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-purple-800/20 rounded-tr-sm"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-purple-800/20 rounded-bl-sm"></div>
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-purple-800/20 rounded-br-sm"></div>
            </div>
          </div>
        </div>

        {/* Albums container with increased gap */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-48 w-full">
          {/* Village Album */}
          <div className="album-wrapper">
            <div className="album-container transform -rotate-2">
              <AlbumCover
                title="Village"
                category="village"
                previewImage={"/images/Village 8x10 01.jpg"}
              />
            </div>
          </div>

          {/* Contemporary Album */}
          <div className="album-wrapper">
            <div className="album-container transform rotate-2">
              <AlbumCover
                title="Contemporary"
                category="contemporary"
                previewImage={"/images/01 Painter house with tree 8x10.jpg"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
