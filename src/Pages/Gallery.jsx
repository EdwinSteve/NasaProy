import MediaCard from '../Components/MediaCard';
import ContainerMediaCard from '../Components/ContainerMediaCard';
import Greet from '../Components/Greet';

export default function Gallery() {
  const dataList = [
    {
      _id: "68dde54d4f63200b5dcb5443",
      identifier: "ap1101_01_01",
      title: "ap1101_01_01",
      mission: "ap11",
      created_at: null,
      url: "https://ser.sese.asu.edu/cgi-bin/DPSC_Position.pl?position=ap1101_01_01",
      thumbnail_url: null,
      center: "0.67° 23.47°",
      center_latitude: 0.67,
      center_longitude: 23.47
    },
    {
      _id: "68dde54d4f63200b5dcb5444",
      identifier: "ap1101_01_06",
      title: "ap1101_01_06",
      mission: "ap11",
      created_at: null,
      url: "https://ser.sese.asu.edu/cgi-bin/DPSC_Position.pl?position=ap1101_01_06",
      thumbnail_url: "https://ser.sese.asu.edu/DPSC/jpeg/AP11/ap1101_01_06.jpg",
      center: "0.67° 23.47°",
      center_latitude: 0.67,
      center_longitude: 23.47
    },
    {
      _id: "68dde54d4f63200b5dcb5445",
      identifier: "ap1101_01_07",
      title: "ap1101_01_07",
      mission: "ap11",
      created_at: null,
      url: "https://ser.sese.asu.edu/cgi-bin/DPSC_Position.pl?position=ap1101_01_07",
      thumbnail_url: "https://ser.sese.asu.edu/DPSC/jpeg/AP11/ap1101_01_07.jpg",
      center: "0.67° 23.47°",
      center_latitude: 0.67,
      center_longitude: 23.47
    },
    {
      _id: "68dde54d4f63200b5dcb5443",
      identifier: "ap1101_01_01",
      title: "ap1101_01_01",
      mission: "ap11",
      created_at: null,
      url: "https://ser.sese.asu.edu/cgi-bin/DPSC_Position.pl?position=ap1101_01_01",
      thumbnail_url: null,
      center: "0.67° 23.47°",
      center_latitude: 0.67,
      center_longitude: 23.47
    },
    {
      _id: "68dde54d4f63200b5dcb5444",
      identifier: "ap1101_01_06",
      title: "ap1101_01_06",
      mission: "ap11",
      created_at: null,
      url: "https://ser.sese.asu.edu/cgi-bin/DPSC_Position.pl?position=ap1101_01_06",
      thumbnail_url: "https://ser.sese.asu.edu/DPSC/jpeg/AP11/ap1101_01_06.jpg",
      center: "0.67° 23.47°",
      center_latitude: 0.67,
      center_longitude: 23.47
    },
    {
      _id: "68dde54d4f63200b5dcb5445",
      identifier: "ap1101_01_07",
      title: "ap1101_01_07",
      mission: "ap11",
      created_at: null,
      url: "https://ser.sese.asu.edu/cgi-bin/DPSC_Position.pl?position=ap1101_01_07",
      thumbnail_url: "https://ser.sese.asu.edu/DPSC/jpeg/AP11/ap1101_01_07.jpg",
      center: "0.67° 23.47°",
      center_latitude: 0.67,
      center_longitude: 23.47
    }
  ];

  return (
    <>
      <Greet />
      <ContainerMediaCard>
        {dataList.map((item) => (
          <MediaCard key={item._id} data={item} />
        ))}
      </ContainerMediaCard>
    </>
  );
}
