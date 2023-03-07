import Webcam from 'react-webcam';
import { CameraOptions, useFaceDetection } from 'react-use-face-detection';
import FaceDetection from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';
import './style.scss';
import React, { useState, useEffect } from 'react';

const WebcamDemo = (): JSX.Element => {
  const { webcamRef, boundingBox, isLoading, detected, facesDetected } = useFaceDetection({
    faceDetectionOptions: {
      model: 'short',
    },
    faceDetection: new FaceDetection.FaceDetection({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    }),
    camera: ({ mediaSrc, onFrame, width, height }: CameraOptions) =>
      new Camera(mediaSrc, {
        onFrame,
        width,
        height,
      }),
  });

  const [maxNumInfo, setMaxNumInfo] = useState({
    value: 0,
    timestamp: new Date(),
  });

  useEffect(() => {
    if (facesDetected > maxNumInfo.value) {
      setMaxNumInfo({
        value: facesDetected,
        timestamp: new Date(),
      });
    }
  }, [facesDetected]);
  return (
    <div style={{ display: 'flex', flexFlow: 'row-reverse', justifyContent: 'space-between', width: 'calc(24% + 800px)', height: '600px' }}>
      {/* <p>{`Loading: ${isLoading}`}</p> */}
      {/* <p>{`Face Detected: ${detected}`}</p> */}
      <div className="group">
        <div className="card">
          <p>Rostos reconhecidos:</p>
          <span>{facesDetected}</span>
        </div>
        <div className="card">
          <p>Maior quantidade:</p>
          <span>{maxNumInfo.value}</span>
        </div>
        <div className="card">
          <p>Horário de maior movimentação:</p>
          <span>{maxNumInfo.timestamp.toLocaleTimeString()}</span>
        </div>
      </div>
      <div style={{ width: '800px', marginRight: '30px', border: 'solid 3px #AB0130', height: '600px', position: 'relative', borderRadius: '30px', overflow: 'hidden' }}>
        {boundingBox.map((box, index) => (
          <div
            key={`${index + 1}`}
            style={{
              border: '4px solid red',
              position: 'absolute',
              borderRadius: '20px',

              top: `${box.yCenter * 100}%`,
              left: `${box.xCenter * 100}%`,
              width: `${box.width * 100}%`,
              height: `${box.height * 100}%`,
              zIndex: 1,
            }}
          />
        ))}
        <Webcam
          ref={webcamRef}
          forceScreenshotSourceSize
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            position: 'absolute',
          }}
        />
      </div>
    </div>
  );
};

export default WebcamDemo;
