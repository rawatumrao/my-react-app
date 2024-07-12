export const createData = (DATA) => {
  const processedData = [];

  DATA?.map((item) => {
    if (item?.displayName === undefined) item.displayName = item?.display_name;

    if (item?.spotlightOrder === undefined)
      item.spotlightOrder = item?.spotlight;

    if (item?.isCameraMuted === undefined)
      item.isCameraMuted = item?.is_video_muted;

    if (item?.isMuted === undefined)
      item.isMuted = item?.is_muted === "YES" ? true : false;

    if (item?.raisedHand === undefined)
      item.raisedHand = item?.buzz_time ? true : false;

    if (item?.rxPresentation === undefined)
      item.rxPresentation =
        item?.rx_presentation_policy === "ALLOW" ? true : false;

    if (item?.isPresenting === undefined)
      item.isPresenting = item?.is_presenting === "YES" ? true : false;

    processedData?.push(item);
  });

  return processedData;
};
