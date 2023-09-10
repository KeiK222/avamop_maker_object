import * as React from "react";
interface ObjectStructure {
  [category: string]: {
    [partName: string]: string;
  };
}
export const MakerPartsDataImporter: React.Context<ObjectStructure> = React.createContext<ObjectStructure>(
  {
    "backhairfront": {
      "backhairfront1": "backhairfront/backhairfront1.png",
      "backhairfront2": "backhairfront/backhairfront2.png"
    },
    "backhairunder": {
      "backhairunder1": "backhairunder/backhairunder1.png",
      "backhairunder2": "backhairunder/backhairunder2.png"
    },
    "body": {
      "body1": "body/body1.png",
      "body2": "body/body2.png"
    },
    "ear": {
      "ear1": "ear/ear1.png",
      "ear2": "ear/ear2.png"
    },
    "eye": {
      "eye1": "eye/eye1.png",
      "eye2": "eye/eye2.png"
    },
    "eyebrows": {
      "eyebrows1": "eyebrows/eyebrows1.png",
      "eyebrows2": "eyebrows/eyebrows2.png"
    },
    "fronthair": {
      "fronthair1": "fronthair/fronthair1.png",
      "fronthair2": "fronthair/fronthair2.png"
    },
    "frontsidehair": {
      "frontsidehair1": "frontsidehair/frontsidehair1.png",
      "frontsidehair2": "frontsidehair/frontsidehair2.png"
    },
    "head": {
      "head1": "head/head1.png",
      "head2": "head/head2.png"
    },
    "mouth": {
      "mouth1": "mouth/mouth1.png",
      "mouth2": "mouth/mouth2.png"
    },
    "nose": {
      "nose1": "nose/nose1.png",
      "nose2": "nose/nose2.png"
    },
  }
)
