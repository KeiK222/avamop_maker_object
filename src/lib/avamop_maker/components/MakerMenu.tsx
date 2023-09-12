import { useState } from "react";
import MakerPartsCategories from "./MakerPartsCategories";

interface MakerMenuProps {
  objectStructure: ObjectStructure;
  path: string;
}

const MakerManu: React.FC<MakerMenuProps> = ({ objectStructure, path }) => {
  const viewStatus = {};
  for (const category in objectStructure) {
    const keys = Object.keys(objectStructure[category]);
    if (keys.length > 0) {
      viewStatus[category] = { [keys[0]]: objectStructure[category][keys[0]] };
    }
  }

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedParts, setSelectedParts] = useState(viewStatus);

  const updateCategoryItem = (category: string, key: string, value: string) => {
    const updateAvaters = {
      ...selectedParts,
      [category]: {
        ...selectedParts[category],
        [key]: value,
      },
    };
    setSelectedParts(updateAvaters);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const renderCategories = () => {
    return Object.keys(objectStructure).map((category) => (
      <MakerPartsCategories
        key={category}
        category={category}
        isSelected={selectedCategory === category}
        onClick={() => handleCategoryClick(category)}
        updateCategoryItem={updateCategoryItem}
        path={path}
        selectedParts={selectedParts}
        imageSrc={
          path +
          objectStructure[category][Object.keys(objectStructure[category])[0]]
        }
        categoryItems={objectStructure[category].items}
      />
    ));
  };

  return (
    <div>
      <ul>{renderCategories()}</ul>
      <button onClick={() => console.log("%o", selectedParts)}>button</button>
    </div>
  );
};

export default MakerManu;
