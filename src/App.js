import React, { useState } from 'react';
import { FaImage } from "react-icons/fa";
import Swal from 'sweetalert2';

export default function App()  {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');

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
                ctx.drawImage(image, 0, 0);
                const link = document.createElement('a');
                link.download = 'image.jpg';
                link.href = canvas.toDataURL('image/jpeg');
                link.click();
            };
            image.src = event.target.result;
        };
        reader.readAsDataURL(selectedFile);
    };

    return (
        <div className="container h-[100vh] flex items-center w-[100vw] justify-center flex-col bg-[#030637]
        ">
            <nav className="bg-crimson mt-4 text-red-700 font-bold text-center text-2xl md:text-3xl uppercase rounded">
                <h1>PNG to JPG Converter</h1>
            </nav>

            <div className='h-[40vh] mb-3 '>
            <label htmlFor="input" className="flex flex-col items-center mt-10 border-dashed w-[80vw] md:w-[60vw] border-white rounded-xl h-full">
              
                <span className="text-purple-500 text-lg font-bold mt-4">Drop files here</span>
                <div className='w-[50vw] overflow-hidden my-auto'>

                {fileName &&( <span className="text-purple-500 flex gap-2 "><FaImage/>{fileName}</span>)}
                </div>
                <input type="file" id="input" accept="image/png" onChange={handleFileChange} className="hidden" />
            </label>
            </div>

            <button className="mt-10 bg-crimson text-xl text-white  w-[80vw] md:w-[60vw] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  rounded-xl py-2 px-4   transition duration-300" onClick={convertImage}>
                Click Here to Download JPG
            </button>
           <div className='flex justify-center items-center'>


            <div className="mt-10 w-[80vw] md:w-[60vw] text-white">
                <h2 className="text-center text-crimson font-bold uppercase mb-4">About PNG to JPG Converter</h2>
                <p>A website for the best PNG to JPG converter is a platform that allows users to easily convert their PNG images to the JPG format. The PNG to JPG conversion process is essential for users who want to optimize their image files for web use, where JPG is the preferred format</p>
                <p>The website features a simple upload system, where users can select their PNG image file and initiate the conversion process with a single click. The conversion process is fast and efficient, producing high-quality JPG images that maintain the visual integrity of the original PNG files.</p>
            </div>
           </div>

            <footer className="text-center bottom-2 mt-6 text-white">Copyright &copy; <a href="#">Rico</a> | Developed With you ❤️ By <a href="#" className='text-pink-500'>Rico</a></footer>
        </div>
    );
};


