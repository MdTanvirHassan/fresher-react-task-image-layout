import React, { useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import img from "./images/image-11.jpeg";
import img1 from "./images/image-1.webp";
import img2 from "./images/image-2.webp";
import img3 from "./images/image-3.webp";
import img4 from "./images/image-4.webp";
import img5 from "./images/image-5.webp";
import img6 from "./images/image-6.webp";
import img7 from "./images/image-7.webp";
import img8 from "./images/image-8.webp";
import img9 from "./images/image-9.webp";
import img10 from "./images/image-10.jpeg";
import img11 from "./images/dummy.jpg";

const App = () => {
  const [cardData, setCardData] = useState([
    { id: 1, image: img, title: "Card 1" },
    { id: 2, image: img1, title: "Card 2" },
    { id: 3, image: img2, title: "Card 3" },
    { id: 4, image: img3, title: "Card 4" },
    { id: 5, image: img4, title: "Card 5" },
    { id: 6, image: img5, title: "Card 6" },
    { id: 7, image: img6, title: "Card 7" },
    { id: 8, image: img7, title: "Card 8" },
    { id: 9, image: img8, title: "Card 9" },
    { id: 10, image: img9, title: "Card 10" },
    { id: 11, image: img10, title: "Card 11" },
    { id: 12, image: img11, title: "add image" },
  ]);

  const fileInputRef = useRef(null);

  const handleCardClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [selectedItems, setSelectedItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);

  function handleItemHover(id) {
    setHoveredItem(id);
  }

  function handleItemLeave() {
    setHoveredItem(null);
  }

  function handleItemSelect(id) {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  function handleDelete() {
    const newCardData = cardData.filter(
      (item) => !selectedItems.includes(item.id)
    );
    setCardData(newCardData);
    setSelectedItems([]);
  }

  const isMobile = window.innerWidth <= 768;

  const onDragEnd = (result) => {
    if (
      !result.destination ||
      result.destination.index === cardData.length - 1
    ) {
      return;
    }

    const reorderedCards = Array.from(cardData);
    const [movedCard] = reorderedCards.splice(result.source.index, 1);
    reorderedCards.splice(result.destination.index, 0, movedCard);

    setCardData(reorderedCards);
  };

  return (
    <div className="bg-indigo-100 ">
      <div className="max-w-[1280px] m-auto bg-white h-full w-full mb-10 border border-gray-100 rounded-lg shadow-sm">
        <div className="md:py-4 md:px-10">
          {selectedItems.length === 0 ? (
            <h2>Gallery</h2>
          ) : (
            <div className="flex justify-between">
              <p className="font-bold text-base">
                {selectedItems.length}{" "}
                {selectedItems.length === 1
                  ? "File Selected"
                  : "Files Selected"}
              </p>
              <button
                className="font-bold text-base text-red-500"
                onClick={handleDelete}>
                {selectedItems.length === 1 ? "Delete File" : "Delete Files"}
              </button>
            </div>
          )}
        </div>
        <hr />
        <div className="md:py-4 md:px-10">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="id" direction={isMobile ? "vertical" : "horizontal"}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid md:grid-cols-5 gap-2">
                {cardData.map((card, index) => (
                  <Draggable
                    draggableId={card.id.toString()}
                    index={index}
                    key={card.id}
                    isDragDisabled={index === cardData.length - 1}>
                    {(provided, snapshot) => (
                      <div
                        key={card.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`w-full  flex rounded-lg border-2 border-gray-300 cursor-pointer hover:bg-black/[0.3] ${
                          index === 0
                            ? "md:col-span-2 md:row-span-2 h-full bg-indigo-50"
                            : "md:col-span-1 md:row-span-1 h-full w-full"
                        } ${
                          index === cardData.length - 1
                            ? "bg-green-50 cursor-not-allowed"
                            : "bg-indigo-50"
                        }`}
                        onClick={
                          index === cardData.length - 1 ? handleCardClick : null
                        }
                        onMouseEnter={() => handleItemHover(card.id)}
                        onMouseLeave={handleItemLeave}>
                          
                        {hoveredItem === card.id || selectedItems.includes(card.id) ? (
                          <div className=" inset-0 bg-black/[0.3] opacity-70 group-hover:opacity-100 transition-opacity flex justify-center items-center">
                            <img
                              src={card.image}
                              alt=""
                              className="rounded-lg"
                            />
                          </div>
                        ) : (
                          <div className="hover:bg-black/[0.3]">
                            <img
                              src={card.image}
                              alt=""
                              className="rounded-lg"
                            />
                          </div>
                        )}

                        {index === cardData.length - 1 ? (
                          <div className="items-center justify-center text-center">
                            <input
                              ref={fileInputRef}
                              type="file"
                              style={{ display: "none" }}
                            />
                          </div>
                        ) : (
                          <>
                            {hoveredItem === card.id ||
                            selectedItems.includes(card.id) ? (
                              <div className="absolute p-2">
                                <input
                                  type="checkbox"
                                  className="w-5 h-5 z-100 top-2 left-2 text-blue-600  border-gray-300 rounded focus:ring-blue-500"
                                  onChange={() => handleItemSelect(card.id)}
                                  checked={selectedItems.includes(card.id)}
                                />
                              </div>
                            ) : null}
                          </>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default App;
