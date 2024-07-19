import React from 'react'
import { Card } from "flowbite-react";
import { Link } from 'react-router-dom';

export default function CardNewSpord({ name, image }) {
  

  return (
    <div>
      <Link to={`/spordDital`}>
        <Card className="max-w-sm mb-5" imgSrc={image} horizontal>
          <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
          <p className="font-normal w-[80%] text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </Card>
      </Link>
    </div>
  );
}
