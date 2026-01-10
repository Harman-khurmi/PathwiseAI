import { assets } from '@/app/assets'
import Image from 'next/image'
import React from 'react'

const Title = ({title, gradientText}) => {
  return (
    <>
              <div className="flex items-start md:items-center justify-center gap-2">
                <span>
                  <Image
                    src={assets.sparkle}
                    alt="sparkle"
                    width={30}
                    height={30}
                    className="mt-2 md:mt-0"
                  ></Image>
                </span>
                <h3 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-center w-full">
                  {title}{" "}
                  <span className="gradient-primary text-transparent bg-clip-text">
                    {gradientText}
                  </span>
                </h3>
                <span>
                  <Image
                    src={assets.sparkle}
                    alt="sparkle"
                    width={30}
                    height={30}
                    className="mt-2 md:mt-0"
                  ></Image>
                </span>
              </div>
    </>
  )
}

export default Title