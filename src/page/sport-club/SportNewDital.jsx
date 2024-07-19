import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchClubById, selectSingleClub } from '../../redux/feature/sportclub/SportClubSlice';
import CardNewDital from './CardNewDital';

export default function SportNewDital() {
    const param=useParams();
   const searchByid=useSelector(selectSingleClub);

   const dispach=useDispatch();
   useEffect(()=>{
    dispach(fetchClubById(param.id))
   },[])
   console.log("test id ",searchByid)
  return (
    <div>
      <CardNewDital
        lat={searchByid.latitude}
        lng={searchByid.longitude}
        name={searchByid.sport_name}
        img={searchByid.image}
        id={searchByid.id}
      />
    </div>
  );
}
