import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useMeasure } from "react-use";
import {} from "./AccordionStyledComponents";
import { AccordionBanner, AccordionContents } from "./AccordionParts";

const ExpandableAccordionEntry = ({ entry }) => {
  const defaultHeight = "0px";

  const [expanded, setExpanded] = useState(false);

  // The height of the content inside of the accordion
  const [contentHeight, setContentHeight] = useState(defaultHeight);

  const [ref, { height }] = useMeasure();

  useEffect(() => {
    //Sets initial height
    setContentHeight(height);

    //Adds resize event listener
    window.addEventListener("resize", setContentHeight(height));

    // Clean-up
    return window.removeEventListener("resize", setContentHeight(height));
  }, [height]);

  const expand = useSpring({
    height: expanded ? `${contentHeight}px` : defaultHeight,
    overflow: "hidden"
  });

  const toggleExpanded = () => {
    if (expanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };

  const ps = { clickHandler: toggleExpanded, entry, expanded };

  return (
    <div>
      <AccordionBanner {...ps} />
      {/* wrapper? */}
      <animated.div style={expand}>
        {/* animatable? */}
        <div ref={ref}>
          {/* actual content... */}
          <AccordionContents {...ps} />
        </div>
      </animated.div>
    </div>
  );
};

export default ExpandableAccordionEntry;
