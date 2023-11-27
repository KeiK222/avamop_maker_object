import React from "react";
import MakerFaceButton from "./MakerFaceButton";
import "../../module-css/makerMenu/MakerFaceMenu.module.css"; // CSSファイルをインポート


interface MakerFaceMenuProps {
  faceList: string[];
  isLoading: boolean;
  // faceImages: string[];
  changeFace: (face: string) => void;
}

const MakerFaceMenu: React.FC<MakerFaceMenuProps> = ({
  faceList,
  isLoading,
  changeFace,
  // faceImages
}) => {
  return (
    <ul>
      {faceList.map((face) => (
        <MakerFaceButton
          key={face}
          face={face}
          // 表情のサムネイルを用意する予定
          // faceImages= {faceImages[face]}
          onClick={() => changeFace(face)}
        />
      ))}
    </ul>
  );
};
export default React.memo(MakerFaceMenu);
