import React from "react";
import Image from "next/image"; // Make sure to use the correct import for Image
import Link from "next/link";

const clusters = [
  {
    name: "Finance",
    imageUrl:
      "https://assets-global.website-files.com/600faaecb03ce57f6fa98050/60381f0c7b3f182a3beea020_Collegiate%20SMG%202019%20Session%201%20Winners-16x9.jpg", // Replace with the actual path to your finance image
    color: "rgba(0, 128, 0, 0.8)",
    path: "/finance",
  },
  {
    name: "Hospitality & Tourism",
    imageUrl:
      "https://assets-global.website-files.com/600faaecb03ce57f6fa98050/616f61644a4a4c41cac8e0c1_5E3A3377.jpg", // Replace with the actual path to your hospitality image
    color: "rgba(0, 0, 255, 0.7)",
    path: "/hospitality",
  },
  {
    name: "Marketing",
    imageUrl:
      "https://assets-global.website-files.com/600faaecb03ce57f6fa98050/61560ae8b66c2b799fd5903e_Role-Play%20Guide%20B.jpg", // Replace with the actual path to your marketing image
    color: "rgba(255, 0, 0, 0.7)",
    path: "/marketing",
  },
  {
    name: "Business Management & Administration",
    imageUrl:
      "https://assets-global.website-files.com/600faaecb03ce57f6fa98050/64480365a65c7efa627deb2e_CE%20Draft%20Topics%2023-24.png", // Replace with the actual path to your business management image
    color: "rgba(255, 255, 0, 0.8)",
    path: "/business-management",
  },
  {
    name: "Personal Financial Literacy",
    imageUrl:
      "https://assets-global.website-files.com/600faaecb03ce57f6fa98050/6144aa59ff90644d81f150bd_DECA-Power-Conference-B.jpg", // Replace with the actual path to your business management image
    color: "rgba(144, 238, 144, 0.8)",
    path: "/personal-financial-literacy",
  },
  {
    name: "Entrepreneurship",
    imageUrl:
      "https://assets-global.website-files.com/600faaecb03ce57f6fa98050/630e1f826cc4c342d1208787_Roleplays-B.jpg", // Replace with the actual path to your business management image
    color: "rgba(110,110,110, 0.9)",
    path: "/entrepreneurship",
  },
];

export default function Main() {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pb-8">
      <div className="pb-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {clusters.map((cluster, index) => (
            <Link href={cluster.path} key={index}>
              <div

                className="relative border rounded-lg shadow-lg h-64 overflow-hidden"
              >
                <img
                  src={cluster.imageUrl} // Use the imageUrl from the cluster object
                  alt={cluster.name}
                  fill // For Next.js 13
                  className="transition-opacity duration-300 ease-out"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: cluster.color,
                    mixBlendMode: "multiply",
                    zIndex: 1,
                  }}
                />
                <h2 className="font-bold text-5xl text-white absolute top-14 left-10 z-10">
                  {cluster.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
