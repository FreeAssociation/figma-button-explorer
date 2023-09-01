// Unpack the required methods from the figma widget API
const { AutoLayout, Text, useSyncedState } = figma.widget;

// Import the chroma-js library for manipulating colors
import chroma from "chroma-js";

// Function for generating an array of colors that
// pair "well" with a starting base color
// Accepts a hex string like `generatePairingOptions("#FF0000")`
const generatePairingOptions = (hexColor: string) => {
  // The basr color
  const baseColor = chroma(hexColor);

  // Indentify the complementary by subtracting the base color from white
  const complementaryColor = chroma(chroma("#FFFFFF").num() - baseColor.num());

  // Create adjacent colors by copying the base color
  // and shifting the hue 50 degrees clockwise and counter-clockwise
  // (hude is on 0-360 degree scale)
  const adjacentA = chroma(baseColor).set("hsl.h", `+50`);
  const adjacentB = chroma(baseColor).set("hsl.h", `-50`);

  // Identify the two triadic pairs by shifting the hue
  // 120 degrees clockwise and counter-clockwise
  const triadicA = chroma(baseColor).set("hsl.h", `+120`);
  const triadicB = chroma(baseColor).set("hsl.h", `-120`);

  // Loop through all the colors to identify a good text overlay
  // color (black or white) by measuring contrast
  const colors = [
    baseColor,
    adjacentA,
    adjacentB,
    complementaryColor,
    triadicA,
    triadicB,
  ].map((color) => {
    // Measure contrast for white/black
    const whiteContast = chroma.contrast(color, "#FFFFFF");
    const blackContast = chroma.contrast(color, "#000000");

    return {
      // Return the hex value of the color
      color: color.hex(),
      // Assign the better contrast color as the text color
      textColor: whiteContast > blackContast ? "#FFFFFF" : "#000000",
    };
  });

  return colors;
};

function Widget() {
  // Save the baseColor to the internal state
  // => a hex code string
  const [
    baseColor, // the value we can use throughout the widget
    setBaseColor, // a function we use to update the value
  ] = useSyncedState(
    "baseColor", // the name of the variable
    "#000000" // the default value
  );

  // Save the pairing options to the internal state
  // => an array of color options
  const [
    pairingOptions, // the value we can use throughout the widget
    setPairingOptions, // a function we use to update the value
  ] = useSyncedState(
    "pairingOptions", // the name of the variable
    generatePairingOptions(baseColor) // the default value
  );

  // This is the main body of the widget
  return (
    <AutoLayout
      width={"hug-contents"}
      height={"hug-contents"}
      fill={"#FFFFFF"}
      padding={48}
      direction="vertical"
      spacing={24}
    >
      <AutoLayout // <= randomize button
        height={56}
        stroke={"#000000"}
        padding={{ horizontal: 48 }}
        verticalAlignItems="center"
        onClick={() => {
          // Upon click, pick a random color thru chroma
          const newColor = chroma.random();
          // Save the new color's hex value to out baseColor
          setBaseColor(newColor.hex());
          // Generate pairs for the new color and save them
          setPairingOptions(generatePairingOptions(newColor.hex()));
        }}
      >
        <Text fontWeight={"bold"} fontSize={18} fill={"#000000"}>
          Randomize
        </Text>
      </AutoLayout>
      {/* Loop through each color in pairingOptions to see what a button would look like */}
      {pairingOptions.map((option) => {
        return (
          <AutoLayout direction="horizontal" spacing={24}>
            {/* For each color, we'll also look at some different cornerRadius options */}
            {[0, 4, 8, 12, 1000].map((radius) => {
              return (
                <AutoLayout // <= example button
                  height={56}
                  // Assign the option color as the button fill
                  fill={option.color}
                  padding={{
                    horizontal: 48,
                  }}
                  verticalAlignItems="center"
                  // Assigng the radius
                  cornerRadius={radius}
                  onClick={() => {
                    // Upon click, update the base color to be this option
                    setBaseColor(option.color);
                    // Generate new pairs and save them
                    setPairingOptions(generatePairingOptions(option.color));
                  }}
                >
                  <Text
                    fontWeight={"bold"}
                    fontSize={18}
                    // Assign the options text color (white or black) to the text
                    fill={option.textColor}
                  >
                    Add to cart
                  </Text>
                </AutoLayout>
              );
            })}
          </AutoLayout>
        );
      })}
    </AutoLayout>
  );
}

figma.widget.register(Widget);
