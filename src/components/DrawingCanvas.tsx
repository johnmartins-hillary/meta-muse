import React, { useRef, useState } from 'react';
import { Stage, Layer, Line, Rect, Circle, Text as KonvaText, Image as KonvaImage } from 'react-konva';
import { Brush, Eraser, Square, Circle as CircleIcon, Type, Move, Trash2, ArrowLeftCircle, Upload, Crop, RotateCcw } from 'lucide-react';
import Cropper from 'react-easy-crop';

interface Line {
  points: number[];
  color: string;
  width: number;
}

interface Shape {
  type: 'rectangle' | 'circle';
  x: number;
  y: number;
  color: string;
  width?: number;
  height?: number;
  radius?: number;
}

interface TextItem {
  text: string;
  x: number;
  y: number;
  color: string;
}

interface ImageItem {
  img: any; // Use string for URL or HTMLImageElement for the loaded image
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

const getCroppedImg = async (imageSrc: string, pixelCrop: { x: number; y: number; width: number; height: number }): Promise<string | null> => {
  const image = document.createElement('img');
  image.src = imageSrc;
  const canvas = document.createElement('canvas');
  const ctx:any = canvas.getContext('2d');

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(file ? URL.createObjectURL(file) : null);
    }, 'image/jpeg');
  });
};

const DrawingCanvas: React.FC = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [texts, setTexts] = useState<TextItem[]>([]);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState<string>('#000000');
  const [brushSize, setBrushSize] = useState<number>(5);
  const [selectedTool, setSelectedTool] = useState<string>('brush');
  const [text, setText] = useState<string>('');
  const [cropData, setCropData] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [croppingImage, setCroppingImage] = useState<ImageItem | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const stageRef = useRef<any>(null);

  const handleMouseDown = () => {
    setIsDrawing(true);
    const pos = stageRef.current.getPointerPosition();

    if (selectedTool === 'brush') {
      setLines((prevLines) => [...prevLines, { points: [pos.x, pos.y], color: brushColor, width: brushSize }]);
    } else if (selectedTool === 'rectangle') {
      setShapes((prevShapes) => [...prevShapes, { type: 'rectangle', x: pos.x, y: pos.y, color: brushColor, width: 100, height: 100 }]);
    } else if (selectedTool === 'circle') {
      setShapes((prevShapes) => [...prevShapes, { type: 'circle', x: pos.x, y: pos.y, color: brushColor, radius: 50 }]);
    } else if (selectedTool === 'text' && text) {
      setTexts((prevTexts) => [...prevTexts, { text, x: pos.x, y: pos.y, color: brushColor }]);
      setText('');
    }
  };

  const handleMouseMove = () => {
    if (!isDrawing) return;

    const stage = stageRef.current;
    const point = stage.getPointerPosition();

    if (selectedTool === 'brush') {
      const lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImages((prevImages) => [...prevImages, { img, x: 100, y: 100, width: 100, height: 100, rotation: 0 }]);
      };
    });
  };

  const handleCropComplete = async (croppedArea: any, croppedAreaPixels: any) => {
    if (selectedImageIndex !== null) {
      const croppedImage = await getCroppedImg(images[selectedImageIndex].img.src, croppedAreaPixels);
      const updatedImages = [...images];
      if (croppedImage) {
        updatedImages[selectedImageIndex] = { ...updatedImages[selectedImageIndex], img: croppedImage };
      }
      setImages(updatedImages);
      setCroppingImage(null);
    }
  };

  const clearCanvas = () => {
    setLines([]);
    setShapes([]);
    setTexts([]);
    setImages([]);
  };

  const undoLast = () => {
    if (selectedTool === 'brush') {
      setLines(lines.slice(0, -1));
    } else if (selectedTool === 'rectangle' || selectedTool === 'circle') {
      setShapes(shapes.slice(0, -1));
    } else if (selectedTool === 'text') {
      setTexts(texts.slice(0, -1));
    } else if (selectedImageIndex !== null) {
      setImages(images.slice(0, -1));
    }
  };

  const rotateImage = () => {
    if (selectedImageIndex !== null) {
      const updatedImages = [...images];
      updatedImages[selectedImageIndex].rotation += 90; // Rotate the image by 90 degrees
      setImages(updatedImages);
    }
  };

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      {/* Sidebar for Tools */}
      <div className="w-1/6 bg-gray-900 p-4 space-y-4">
        <h2 className="text-lg font-bold mb-2">Tools</h2>
        <div className="space-y-2">
          <div onClick={() => setSelectedTool('brush')} className="flex items-center cursor-pointer space-x-2">
            <Brush color={selectedTool === 'brush' ? 'blue' : 'white'} size={24} />
            <span>Brush</span>
          </div>
          <div onClick={() => setSelectedTool('eraser')} className="flex items-center cursor-pointer space-x-2">
            <Eraser color={selectedTool === 'eraser' ? 'blue' : 'white'} size={24} />
            <span>Eraser</span>
          </div>
          <div onClick={() => setSelectedTool('rectangle')} className="flex items-center cursor-pointer space-x-2">
            <Square color={selectedTool === 'rectangle' ? 'blue' : 'white'} size={24} />
            <span>Rectangle</span>
          </div>
          <div onClick={() => setSelectedTool('circle')} className="flex items-center cursor-pointer space-x-2">
            <CircleIcon color={selectedTool === 'circle' ? 'blue' : 'white'} size={24} />
            <span>Circle</span>
          </div>
          <div onClick={() => setSelectedTool('text')} className="flex items-center cursor-pointer space-x-2">
            <Type color={selectedTool === 'text' ? 'blue' : 'white'} size={24} />
            <span>Text</span>
          </div>
          <div onClick={() => setSelectedTool('select')} className="flex items-center cursor-pointer space-x-2">
            <Move color={selectedTool === 'select' ? 'blue' : 'white'} size={24} />
            <span>Select</span>
          </div>
          <div className="flex items-center cursor-pointer space-x-2">
            <Upload size={24} />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              multiple
              className="mt-1"
              style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
            />
            {/* <span className="cursor-pointer" onClick={() => document.querySelector('input[type="file"]')?.click()}>
              Upload Image(s)
            </span> */}
          </div>
          <div onClick={clearCanvas} className="flex items-center cursor-pointer space-x-2">
            <Trash2 size={24} />
            <span>Clear</span>
          </div>
          <div onClick={undoLast} className="flex items-center cursor-pointer space-x-2">
            <ArrowLeftCircle size={24} />
            <span>Undo</span>
          </div>
          <div onClick={rotateImage} className="flex items-center cursor-pointer space-x-2">
            <RotateCcw size={24} />
            <span>Rotate</span>
          </div>
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type text"
          className="mt-2 p-1 w-full"
        />
        <div className="flex flex-col">
          <label className="mt-2">Brush Color:</label>
          <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} />
          <label className="mt-2">Brush Size:</label>
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Drawing Area */}
      <div className="flex-grow">
        <Stage
          ref={stageRef}
          width={window.innerWidth * (5 / 6)} // Width of the canvas
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
        >
          <Layer>
            {lines.map((line, index) => (
              <Line
                key={index}
                points={line.points}
                stroke={line.color}
                strokeWidth={line.width}
                lineCap="round"
                globalCompositeOperation={selectedTool === 'eraser' ? 'destination-out' : 'source-over'}
              />
            ))}
            {shapes.map((shape, index) => {
              if (shape.type === 'rectangle') {
                return (
                  <Rect
                    key={index}
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    fill={shape.color}
                  />
                );
              } else if (shape.type === 'circle') {
                return (
                  <Circle
                    key={index}
                    x={shape.x}
                    y={shape.y}
                    radius={shape.radius}
                    fill={shape.color}
                  />
                );
              }
              return null;
            })}
            {texts.map((textItem, index) => (
              <KonvaText
                key={index}
                text={textItem.text}
                x={textItem.x}
                y={textItem.y}
                fill={textItem.color}
                fontSize={24}
              />
            ))}
            {images.map((imageItem, index) => (
              <KonvaImage
                key={index}
                image={imageItem.img}
                x={imageItem.x}
                y={imageItem.y}
                width={imageItem.width}
                height={imageItem.height}
                rotation={imageItem.rotation}
              />
            ))}
          </Layer>
        </Stage>
      </div>

      {/* Cropper Modal */}
      {croppingImage && (
        <Cropper
          image={croppingImage.img.src}
          crop={cropData}
          onCropChange={setCropData}
          onCropComplete={handleCropComplete}
          // Add additional Cropper settings as needed
        />
      )}
    </div>
  );
};

export default DrawingCanvas;
