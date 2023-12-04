import React, { useState, useEffect } from "react";
import { MakerSelectedPartsGen } from "./functions/fetchData/MakerSelectedPartsGen";
import { MakerFaceGen } from "./functions/fetchData/MakerFaceGen";
import MakerView from "./MakerView/MakerView";
import MakerPartsMenu from "./makerMenu/MakerPartsMenu";
import MakerFaceMenu from "./makerMenu/MakerFaceMenu";
import { MakerConvertPartsToMenuIcons } from "./functions/imageProcess/MakerConvertPartsToMenuIcons";
import { MakerConvertPartsJimp } from "./functions/objectProcess/MakerConvertPartsJimp";
import { MakerFetchCategoryIcons } from "./functions/imageProcess/MakerFetchCategoryIcons";
import MakerColorsMenu from "./makerMenu/MakerColorsMenu";
interface MakerMenuProps {
  path: string;
  partsObject: PartsObjectSplit;
  categoryIconObject: categoryIconObject;
  colorsObject: ColorsObject;
  defaultColors: DefaultColors;
}

const MakerWindow: React.FC<MakerMenuProps> = ({
  path,
  partsObject,
  categoryIconObject,
  colorsObject,
  defaultColors,
}) => {
  const TmpselectedParts: SelectedParts = MakerSelectedPartsGen(partsObject);
  const faceList: string[] = MakerFaceGen(partsObject);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedParts, setselectedParts] =
    useState<SelectedParts>(TmpselectedParts);
  const [selectedFace, setSelectedFace] = useState<string>("normal");
  const [categoryIcon, setCategoryIcon] = useState<categoryIconObject | null>(
    null
  );
  const [menuPartIcon, setMenuPartIcon] =
    useState<CombinePartIconsObjectBase64 | null>(null);
  const [partsObjectJimp, setpartsObjectJimp] =
    useState<PartsObjectJimp | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const changeFace = (face: string) => {
    setSelectedFace(face);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmpCategoryIcon = await MakerFetchCategoryIcons(
          categoryIconObject,
          path + "thumbnails/"
        );
        const tmppartsObjectJimp: PartsObjectJimp = await MakerConvertPartsJimp(
          partsObject,
          path + "parts/"
        );
        setpartsObjectJimp(tmppartsObjectJimp);
        const menuPartIconList: Promise<CombinePartIconsObjectBase64> =
          MakerConvertPartsToMenuIcons(tmppartsObjectJimp);
        setCategoryIcon(tmpCategoryIcon);
        setMenuPartIcon(await menuPartIconList);
        setIsLoading(false); // データの読み込みが完了したらisLoadingをfalseに設定
      } catch (error) {
        console.log("データ読み込みエラー:", error);
        setIsLoading(false); // エラーが発生した場合もisLoadingをfalseに設定
      }
    };
    fetchData();
  }, []); // 空の依存リストを指定して初回のみ実行されるように

  return (
    <div>
      {/* 画像データのロードが終わったら中身を表示する */}
      {isLoading && !partsObjectJimp && !menuPartIcon ? (
        <div>Loading...</div>
      ) : (
        <>
          <MakerColorsMenu colorsObject={colorsObject} />
          {/* アバターメーカーのアバター表示部分 */}
          <MakerView
            selectedParts={selectedParts}
            partsObjectJimp={partsObjectJimp}
            selectedFace={selectedFace}
            scale={2}
          />
          {/* アバターメーカーの表情メニュー部分 */}
          <MakerFaceMenu
            faceList={faceList}
            isLoading={isLoading}
            changeFace={changeFace}
          />
          {/* アバターメーカーのパーツメニュー部分 */}
          <MakerPartsMenu
            isLoading={isLoading}
            categoryIconObject={categoryIcon}
            selectedCategory={selectedCategory}
            selectedFace={selectedFace}
            handleCategoryClick={handleCategoryClick}
            menuPartIcon={menuPartIcon}
            selectedParts={selectedParts}
            setselectedParts={setselectedParts}
          />
        </>
      )}
      {/* オブジェクト変化テスト用ボタン */}
      <button onClick={() => console.log("%o", selectedParts)}>button</button>
    </div>
  );
};

export default React.memo(MakerWindow);
