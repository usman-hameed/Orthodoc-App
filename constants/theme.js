export const COLORS = {
  primary: "#07BEF8",
  secondary: "#25C30C",

  white: "#FFF",
  gray: "#74858C",
  red: "#E80C0C",
  dark: "#000000",
  appBg: "#FBFDFE",
  border: "#F2F6FA",
};

export const SIZES = {
  base: 10,
  regular: 12,
  smallHeading: 16,
  largeHeading: 18,
  extraLarge: 20,
  extraLargePlus: 22,
  extraLargeProMax: 24,
};

export const FONTS = {
  bold: "InterBold",
  semiBold: "InterSemiBold",
  medium: "InterMedium",
  regular: "InterRegular",
  light: "InterLight",
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  dark: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
};
