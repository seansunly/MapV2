import React from 'react'

export default function CardNewDital({ lat, lng, name, img ,id}) {
  return (
    <div>
      <div  className="">
        <h2 className="">
          {name}
        </h2>
        <img src={img} alt="" />

        <div>
            <div>
                {lat}
            </div>
            <div>
                {lng}
            </div>,
        </div>
        
      </div>
      
    </div>
  );
}
