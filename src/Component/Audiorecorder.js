import React,{useState,useRef} from 'react';


export default function Audiorecorder(){

    const audioChunk=useRef([]);
    const [recordings,setRecordings]=useState([])



    const startRec=async()=>{
      const stream= await navigator.mediaDevices.getUserMedia({audio:true});
      const mediaRecorder =new MediaRecorder(stream);

      mediaRecorder.ondataavailable=(e)=>{
        if(e.data.size>0){
          audioChunk.current.push(e.data);
        }
      }
      mediaRecorder.onstop=()=>{
        const audioBlob= new Blob(audioChunk.current,{type:'audio/wav'});
        const audioUrl=URL.createObjectURL(audioBlob);
        setRecordings((prevRecs)=>[...prevRecs,audioUrl]);
      
    }}
    const stopRec=()=>{

    };
  return(
      <div>
        <button onClick={startRec}>Start</button>
        <button onClick={stopRec}>Stop</button>
        

      </div>


  );
}