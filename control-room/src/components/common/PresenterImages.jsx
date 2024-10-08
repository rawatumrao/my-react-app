import acEnabled from "../../images/presenterLayouts/layoutPresenter_Adaptive.svg";
import acDisabled from "../../images/presenterLayouts/layoutPresenter_Adaptive-Disabled.svg";
import Individual from "../../images/presenterLayouts/layoutPresenter_Individual.svg";
import speakerPlusOne from "../../images/presenterLayouts/layoutPresenter_PIP.svg";
import filmstrip8 from "../../images/presenterLayouts/layoutPresenter_Filmstrip8.svg";
import duo from "../../images/presenterLayouts/layoutPresenter_Duo.svg";
import grid3 from "../../images/presenterLayouts/layoutPresenter_Grid3.svg";
import grid4 from "../../images/presenterLayouts/layoutPresenter_Grid4.svg";
import grid9 from "../../images/presenterLayouts/layoutPresenter_Grid9.svg";
import grid16 from "../../images/presenterLayouts/layoutPresenter_Grid16.svg";
import grid20 from "../../images/presenterLayouts/layoutPresenter_Grid20.svg";
import filmstripDuo20 from "../../images/presenterLayouts/layoutPresenter_DuoFilmstrip.svg";
import twoSpeakerPlus8 from "../../images/presenterLayouts/layoutPresenter_Duo+8.svg";
import speaker9 from "../../images/presenterLayouts/layoutPresenter_Speaker+9.svg";
import filmstrip20 from "../../images/presenterLayouts/layoutPresenter_Filmstrip20.svg";
import speaker12 from "../../images/presenterLayouts/layoutPresenter_Speaker+12.svg";
import speaker19 from "../../images/presenterLayouts/layoutPresenter_Speaker+19.svg";

export const PresenterImages = [
  {
    layout: "5:7",
    imageUrl: acDisabled,
    selectedImageUrl: acEnabled,
    Descrption: "adaptive",
    scope: "Adaptive",
    participantsNumber: 12,
    layoutName: "Adaptive",
    total: 12,
    alt: "Adaptive 12",
  },
  {
    layout: "1:0",
    imageUrl: Individual,
    selectedImageUrl: Individual,
    Descrption: "main speaker only",
    scope: "Speaker",
    participantsNumber: 1,
    layoutName: "Individual",
    total: 1,
    alt: "Individual",
  },
  {
    layout: "1:1",
    imageUrl: speakerPlusOne,
    selectedImageUrl: speakerPlusOne,
    Descrption: "main speaker and up to 1 previous speakers",
    scope: "Speaker",
    participantsNumber: 2,
    layoutName: "Speaker + 1",
    total: 2,
    alt: "1:1",
  },
  {
    layout: "1:7",
    imageUrl: filmstrip8,
    selectedImageUrl: filmstrip8,
    Descrption: "main speaker and up to 7 previous speakers",
    scope: "Speaker",
    participantsNumber: 8,
    layoutName: "Filmstrip 8",
    total: 8,
    alt: "Filmstrip 8",
  },
  {
    layout: "Duo",
    imageUrl: duo,
    selectedImageUrl: duo,
    Descrption: "2 main speakers only",
    scope: "Equalsize",
    participantsNumber: 2,
    layoutName: "Duo",
    total: 2,
    alt: "Duo",
  },
  {
    layout: "Grid3",
    imageUrl: grid3,
    selectedImageUrl: grid3,
    Descrption: "3 main speakers only",
    scope: "Equalsize",
    participantsNumber: 3,
    layoutName: "Grid 3",
    total: 3,
    alt: "Grid 3",
  },
  {
    layout: "4:0",
    imageUrl: grid4,
    selectedImageUrl: grid4,
    Descrption: "2x2 layout, up to a maximum of 4 speakers",
    scope: "Equalsize",
    participantsNumber: 4,
    layoutName: "Grid 4",
    total: 4,
    alt: "Grid 4",
  },
  {
    layout: "9:0",
    imageUrl: grid9,
    selectedImageUrl: grid9,
    Descrption: "3x3 layout, up to a maximum of 9 speakers",
    scope: "Equalsize",
    participantsNumber: 9,
    layoutName: "Grid 9",
    total: 9,
    alt: "Grid 9",
  },
  {
    layout: "16:0",
    imageUrl: grid16,
    selectedImageUrl: grid16,
    Descrption: "4x4 layout, up to a maximum of 16 speakers",
    scope: "Equalsize",
    participantsNumber: 16,
    layoutName: "Grid 16",
    total: 16,
    alt: "Grid 16",
  },
  {
    layout: "25:0",
    imageUrl: grid20,
    selectedImageUrl: grid20,
    Descrption: "5x5 layout, up to a maximum of 25 speakers",
    scope: "Equalsize",
    participantsNumber: 25,
    layoutName: "Grid 20",
    total: 20,
    alt: "Grid 20",
  },
  {
    layout: "2:21",
    imageUrl: filmstripDuo20,
    selectedImageUrl: filmstripDuo20,
    Descrption: "two main speakers and up to 21 other participants",
    scope: "Largegroup",
    participantsNumber: 23,
    layoutName: "Filmstrip Duo 20",
    total: 20,
    alt: "Filmstrip Duo 20",
  },
  {
    layout: "two_mains_eight_around",
    imageUrl: twoSpeakerPlus8,
    selectedImageUrl: twoSpeakerPlus8,
    Descrption: "two main speakers and up to 8 other participants",
    scope: "Largegroup",
    participantsNumber: 10,
    layoutName: "2 Speaker + 8",
    total: 10,
    alt: "2 Speaker + 8",
  },
  {
    layout: "one_main_nine_around",
    imageUrl: speaker9,
    selectedImageUrl: speaker9,
    Descrption: "one main speaker and up to 9 other participants",
    scope: "Largegroup",
    participantsNumber: 10,
    layoutName: "Speaker + 9",
    total: 10,
    alt: "Speaker + 9",
  },
  {
    layout: "1:21",
    imageUrl: filmstrip20,
    selectedImageUrl: filmstrip20,
    Descrption: "one main speakers and up to 21 other participants",
    scope: "Largegroup",
    participantsNumber: 22,
    layoutName: "Filmstrip 20",
    total: 20,
    alt: "Filmstrip 20",
  },
  {
    layout: "one_main_twelve_around",
    imageUrl: speaker12,
    selectedImageUrl: speaker12,
    Descrption: "One main speaker and up to 12 other participants",
    scope: "Largegroup",
    participantsNumber: 13,
    layoutName: "Speaker + 12",
    total: 13,
    alt: "Speaker + 12",
  },
  {
    layout: "1:33",
    imageUrl: speaker19,
    selectedImageUrl: speaker19,
    Descrption: "one main speakers and up to 33 other participants",
    scope: "Largegroup",
    participantsNumber: 34,
    layoutName: "Speaker + 19",
    total: 20,
    alt: "Speaker + 19",
  },
];

export const getParticipantsNumber = (layout) => {
  const image= PresenterImages.find((img)=> img.layout=== layout);
  return image ? image.participantsNumber : null;
};
