'use client';

import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const FormQRGenerator = () => {
  const defaultFields = [
    { id: 'name', label: 'الاسم الكامل', value: '' },
    { id: 'email', label: 'البريد الإلكتروني', value: '' },
    { id: 'phone', label: 'رقم الهاتف', value: '' },
    { id: 'department', label: 'الشعبة الهندسية', value: '' },
    { id: 'notes', label: 'ملاحظات إضافية', value: '' },
  ];

  const [fields, setFields] = useState(defaultFields);
  const [showQR, setShowQR] = useState(false);
  const [qrData, setQrData] = useState('');
  const [textData, setTextData] = useState('');
  const [errors, setErrors] = useState([]);
  const [submissionDate, setSubmissionDate] = useState('');
  const qrCodeRef = useRef(null);
  
  useEffect(() => {
    const now = new Date();
    const months = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'م' : 'ص';
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    
    setSubmissionDate(`${day} من شهر ${month} للعام ${year} الساعة ${formattedTime}`);
  }, []);
  
  const handleChange = (id, value) => {
    setFields(fields.map(field => field.id === id ? { ...field, value } : field));
  };

  const validateForm = () => {
    let validationErrors = [];
    fields.forEach(field => {
      if (field.value === '' && field.id !== 'notes') {
        validationErrors.push(`يرجى ملء حقل ${field.label}`);
      }
    });
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return false;
    }
    setErrors([]);
    return true;
  };

  const generateQR = () => {
    if (!validateForm()) return;

    let formattedText = '';
    fields.forEach(field => {
      if (field.value) {
        formattedText += `${field.label}: ${field.value}\n`;
      }
    });

    formattedText += `تاريخ التقديم: ${submissionDate}`;

    setTextData(formattedText);
    setQrData(formattedText);
    setShowQR(true);
  };

  const resetForm = () => {
    setFields(defaultFields);
    setShowQR(false);
  };

  const downloadQR = () => {
    if (!qrCodeRef.current) return;
    
    // Get the SVG element
    const svgElement = qrCodeRef.current.querySelector('svg');
    if (!svgElement) return;
    
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const img = new Image();
    
    // Set canvas dimensions to match the SVG
    canvas.width = svgElement.width.baseVal.value || 256;
    canvas.height = svgElement.height.baseVal.value || 256;
    
    // Create a data URL from the SVG
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = function() {
      // Draw the image on the canvas
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      // Convert canvas to data URL and trigger download
      const imageUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = 'التقديم.png';
      a.click();
      
      // Clean up
      URL.revokeObjectURL(url);
    };
    
    img.src = url;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white py-8">
      <div dir="rtl" className="w-full max-w-xl p-6 bg-black text-white rounded-lg shadow-lg border border-gray-700">
        <h1 className="text-2xl font-bold mb-8 text-center text-white">
          التقديم على هوية نقابة المهندسين فرع الموصل
        </h1>

        {!showQR ? (
          <>
            {errors.length > 0 && (
              <div className="bg-red-900/30 border border-red-500 rounded-md p-3 mb-6">
                {errors.map((error, index) => (
                  <p key={index} className="text-red-400 text-right text-sm mb-1 last:mb-0">
                    • {error}
                  </p>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 mb-8">
              {fields.map((field) => (
                field.id !== 'notes' ? (
                  <div key={field.id} className="mb-2">
                    <label 
                      htmlFor={field.id} 
                      className="block mb-2 text-right font-medium text-white"
                    >
                      {field.label}:
                    </label>
                    <input
                      type="text"
                      id={field.id}
                      value={field.value}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      className="block w-full px-4 py-3 text-base border border-gray-700 rounded-md 
                                bg-gray-800/80 text-white text-right appearance-none focus:outline-none focus:ring-2 
                                focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      aria-label={field.label}
                    />
                  </div>
                ) : (
                  <div key={field.id} className="mb-2">
                    <label 
                      htmlFor={field.id} 
                      className="block mb-2 text-right font-medium text-white"
                    >
                      {field.label}:
                    </label>
                    <textarea
                      id={field.id}
                      value={field.value}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      className="block w-full px-4 py-3 text-base border border-gray-700 rounded-md 
                              bg-gray-800/80 text-white text-right appearance-none focus:outline-none focus:ring-2 
                              focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      rows="4"
                      aria-label={field.label}
                    />
                  </div>
                )
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={generateQR}
                className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 
                          transition-all duration-200 shadow-lg hover:shadow-indigo-600/30"
              >
                التقديم
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div 
              ref={qrCodeRef} 
              className="bg-gray-800 p-6 rounded-md shadow-md mb-6 border border-gray-700"
            >
              <QRCodeSVG value={qrData} size={256} level="H" />
            </div>

            <div className="mb-6 w-full">
              <h2 className="text-lg font-semibold mb-3 text-white text-center">المعلومات :</h2>
              <div className="bg-gray-800/50 p-4 rounded-md text-sm text-white whitespace-pre-line border border-gray-700">
                {textData}
              </div>
            </div>

            <div className="flex gap-2 flex-wrap justify-center">
              <button
                onClick={downloadQR}
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 
                        transition-all duration-200 shadow-lg hover:shadow-green-600/30"
              >
                تحميل صورة الرمز
              </button>
              
              <button
                onClick={() => setShowQR(false)}
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 
                        transition-all duration-200 shadow-lg hover:shadow-indigo-600/30"
              >
                تعديل المعلومات
              </button>

              <button
                onClick={resetForm}
                className="px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 
                        transition-all duration-200 shadow-lg hover:shadow-gray-600/30"
              >
                إعادة تعبئة النموذج
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormQRGenerator;