// SubmissionBufferPage.tsx
"use client"
import React, { useState } from 'react';

const SubmissionBufferPage = () => {
  const [eLecture, setELecture] = useState(77.1);
  const [understanding, setUnderstanding] = useState(54.2);
  const [notes, setNotes] = useState(27.1);
  const [practicle, setPracticle] = useState(45.0);

  const getBarStyle = (percentage: number) => {
    let bgColor = 'bg-blue-500';
    if (percentage < 30) {
      bgColor = 'bg-red-500';
    } else if (percentage < 70) {
      bgColor = 'bg-orange-500';
    }

    return {
      width: `${percentage}%`,
      backgroundColor: bgColor,
      height: '8px',
      borderRadius: '4px',
    };
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">CLASS : IT-6-SEM</h1>

      {/* Theory Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 bg-gray-200 w-full py-4 px-2">THEORY</h2>
        <div className="bg-white border border-gray-200 rounded p-4">
          <h3 className="font-semibold">CYBER FORENSIC</h3>
          <p className="text-gray-600">CBER-101</p>

          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eLecture">
              E-Lecture: {eLecture}%
            </label>
            <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded dark:bg-blue-500" style={getBarStyle(eLecture)}></div>
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="understanding">
              Understanding: {understanding}%
            </label>
            <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700">
              <div className="bg-orange-600 h-2.5 rounded dark:bg-orange-500" style={getBarStyle(understanding)}></div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
              Notes: {notes}%
            </label>
            <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700">
              <div className="bg-red-600 h-2.5 rounded dark:bg-red-500" style={getBarStyle(notes)}></div>
            </div>
          </div>

          <p className="mt-2 text-gray-500">TEACHER : AJAY RANDHAWA</p>
        </div>
      </div>

      {/* Lab Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2 bg-gray-200 py-4 px-2">LAB</h2>
        <div className="bg-white border border-gray-200 rounded p-4">
          <h3 className="font-semibold">CYBER FORENSIC</h3>
          <p className="text-gray-600">BTCS-904</p>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="practicle">
              Practicle: {practicle}%
            </label>
             <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700">
              <div className="bg-orange-600 h-2.5 rounded dark:bg-orange-500" style={getBarStyle(practicle)}></div>
            </div>
          </div>

          <p className="mt-2 text-gray-500">TEACHER : AJAY RANDHAWA</p>
        </div>
      </div>
    </div>
  );
};

export default SubmissionBufferPage;