import { baseServerUrl } from "../../../config/paths";
import { Card, Image } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

export default function ProductDetailCarousel({ pictures }) {
  const height = "25rem";
  return (
    <Card shadow="sm" radius="md" withBorder>
      <Carousel
        //sx={{ maxWidth: "fitContent" }}
        mx={"auto"}
        height={height}
        loop
        withIndicators
      >
        {pictures.map((pictureUrl) => (
          <Carousel.Slide key={pictureUrl}>
            <Image
              fit="contain"
              height={height}
              src={baseServerUrl + "/" + pictureUrl}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Card>
  );
}
