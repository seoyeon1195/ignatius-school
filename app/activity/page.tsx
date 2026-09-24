import {ActivitySlider} from "./ActivitySlider";

import {client} from "@/sanity/client";
import {
  activityImagesQuery,
  type ActivityGallery,
} from "@/sanity/queries";

export default async function ActivityPage() {
  const gallery = await client.fetch<ActivityGallery>(
    activityImagesQuery,
    {},
    {next: {revalidate: 60}},
  );

  return <ActivitySlider images={gallery?.images ?? []} />;
}
