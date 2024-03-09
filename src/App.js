import React, { useState } from 'react';
import { FaImage } from "react-icons/fa";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

export default function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [convertTo, setConvertTo] = useState('jpg');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const convertImage = () => {
        if (!selectedFile) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Select an Image first!',
                button: 'Ok',
                confirmButtonColor: 'crimson'
            });
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function (event) {
            const image = new Image();
            image.onload = function () {
                const canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(image, 0, 0, image.width, image.height);

                if (convertTo === 'jpg') {
                    const link = document.createElement('a');
                    link.download = 'image.jpg';
                    link.href = canvas.toDataURL('image/jpeg', 1.0);
                    link.click();
                } else if (convertTo === 'pdf') {
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const width = pdf.internal.pageSize.getWidth();
                    const height = pdf.internal.pageSize.getHeight();

                    const widthRatio = width / image.width;
                    const heightRatio = height / image.height;
                    const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

                    const imgWidth = image.width * ratio;
                    const imgHeight = image.height * ratio;

                    const x = (width - imgWidth) / 2;
                    const y = (height - imgHeight) / 2;

                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, imgWidth, imgHeight);
                    pdf.save('image.pdf');
                }
            };
            image.src = event.target.result;
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleConvertToChange = (e) => {
        setConvertTo(e.target.value);
    };

    return (
        <div className="container h-[100vh] flex items-center w-[100vw] justify-center flex-col bg-[#030637]">
            <nav className="bg-crimson mt-4 text-red-600 font-bold text-center text-xl md:text-2xl uppercase rounded">
                <h1>PNG to JPG/PDF Converter</h1>
            </nav>

            <div className='h-[40vh] mb-3 '>
                <label htmlFor="input" className="flex flex-col items-center mt-10 w-[80vw] md:w-[60vw] rounded-lg h-full">

                    <span className="text-purple-500 text-lg font-bold mt-4 cursor-pointer">Click here or Drop files here</span>
                    <div className='w-[60vw] md:w-[50vw] line-clamp-1 my-auto'>

                        {fileName && (<span className="text-pink-500 flex gap-2 items-center justify-center"><FaImage />{fileName}</span>)}
                    </div>
                    <input type="file" id="input" accept="image/png" onChange={handleFileChange} className="hidden" />
                </label>
            </div>

            <select onChange={handleConvertToChange}>
                <option value="jpg">JPG</option>
                <option value="pdf">PDF</option>
            </select>

            <button className="mt-10 bg-crimson text-xl text-white  w-[80vw] md:w-[60vw] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  rounded-xl py-2 px-4 font-semibold" onClick={convertImage}>
                Click Here to Download
            </button>
            <div className='flex justify-center items-center'>

                <div className="mt-10 w-[80vw] md:w-[60vw] text-white text-center">
                    <h2 className="text-center text-crimson font-bold uppercase mb-4 text-purple-600 text-lg">About PNG to JPG/PDF Converter</h2>
                    <p >A website for the best PNG to JPG/PDF converter is a platform that allows users to easily convert their PNG images to the JPG or PDF format. The PNG to JPG/PDF conversion process is essential for users who want to optimize their image files for web use, where JPG is the preferred format</p>
                    <p className='mt-2 hidden md:block'>The website features a simple upload system, where users can select their PNG image file and initiate the conversion process with a single click. The conversion process is fast and efficient, producing high-quality JPG/PDF images that maintain the visual integrity of the original PNG files.</p>
                </div>
            </div>

            <footer className="text-center bottom-2 mt-6 text-gray-300 text-xs">Copyright &copy; <a href="#">Rico</a> | Developed With you ❤️ By <a href="#" className='text-pink-500'>Rico</a></footer>
        </div>
    );
};