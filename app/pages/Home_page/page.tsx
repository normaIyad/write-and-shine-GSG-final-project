import CreatePlog from '@/app/Components/CraetePlog/CreatePlog';
import Plog from '@/app/Components/Plog/Plog';
import React from 'react'
import IPlog from "@/types/types"
const HomePage = () => {
  const testData: IPlog[] = [
    {
        id: 1,
        title: "First Post",
        content: "This is the first test content.",
        createdAt: "2025-03-25T10:00:00Z",
        name: "Alice Johnson",
        image: "https://via.placeholder.com/150"
    },
    {
        id: 2,
        title: "Second Post",
        content: "Another sample content for testing.",
        createdAt: "2025-03-25T11:00:00Z",
        name: "Bob Smith",
        image: "https://via.placeholder.com/150"
    },
    {
        id: 3,
        title: "Third Post",
        content: "More content to test the UI.",
        createdAt: "2025-03-25T12:00:00Z",
        name: "Charlie Brown",
        image: "https://via.placeholder.com/150"
    },
    {
        id: 4,
        title: "Fourth Post",
        content: "Testing with another object.",
        createdAt: "2025-03-25T13:00:00Z",
        name: "David Lee",
        image: "https://via.placeholder.com/150"
    },
    {
        id: 5,
        title: "Fifth Post",
        content: "Ensuring the array works correctly.",
        createdAt: "2025-03-25T14:00:00Z",
        name: "Emily Davis",
        image: "https://via.placeholder.com/150"
    },
    {
        id: 6,
        title: "Sixth Post",
        content: "A simple post for checking UI.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ipsum amet commodi perspiciatis temporibus deserunt veritatis sit ut ex? Veniam architecto facere exercitationem quasi laudantium fugit, magni alias nobis porro nulla, natus ea ullam! Amet itaque iusto aut? Quaerat doloribus dolorem officia beatae, corrupti error incidunt exercitationem iste natus fugiat atque cupiditate. Nihil veniam ipsam reiciendis odio ea optio nostrum esse, molestias perspiciatis iure alias voluptatum, iste asperiores laboriosam provident aliquam cupiditate dignissimos ex repellat labore aut. Iste incidunt rerum nobis, eius omnis obcaecati modi totam, facere quis cupiditate eum enim repudiandae debitis sed fugit dicta voluptas perferendis fugiat quia qui similique. Adipisci rem unde earum qui, nobis odit? Quod numquam dolor et aut sit, ipsum nostrum beatae illo laboriosam eos eius voluptatem cumque doloremque. In, temporibus itaque est eum vitae beatae odit eligendi ipsa labore quo id magnam atque iure voluptate quasi nemo dolor velit dolorem nihil accusantium a aut perferendis blanditiis ad? Consectetur ratione ut quaerat aperiam, repudiandae harum ipsam nemo, eius quasi debitis pariatur in maiores quas tempora assumenda sit vel ex enim optio odit? Mollitia itaque aliquam omnis consequuntur! Amet mollitia iusto sint odit ipsa quis itaque enim, nesciunt aut maxime? Quod velit itaque dolorum hic!",
        createdAt: "2025-03-25T15:00:00Z",
        name: "Frank Wilson",
        image: "https://via.placeholder.com/150"
    },
    {
        id: 7,
        title: "Seventh Post",
        content: "More dummy data for front-end testing.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ipsum amet commodi perspiciatis temporibus deserunt veritatis sit ut ex? Veniam architecto facere exercitationem quasi laudantium fugit, magni alias nobis porro nulla, natus ea ullam! Amet itaque iusto aut? Quaerat doloribus dolorem officia beatae, corrupti error incidunt exercitationem iste natus fugiat atque cupiditate. Nihil veniam ipsam reiciendis odio ea optio nostrum esse, molestias perspiciatis iure alias voluptatum, iste asperiores laboriosam provident aliquam cupiditate dignissimos ex repellat labore aut. Iste incidunt rerum nobis, eius omnis obcaecati modi totam, facere quis cupiditate eum enim repudiandae debitis sed fugit dicta voluptas perferendis fugiat quia qui similique. Adipisci rem unde earum qui, nobis odit? Quod numquam dolor et aut sit, ipsum nostrum beatae illo laboriosam eos eius voluptatem cumque doloremque. In, temporibus itaque est eum vitae beatae odit eligendi ipsa labore quo id magnam atque iure voluptate quasi nemo dolor velit dolorem nihil accusantium a aut perferendis blanditiis ad? Consectetur ratione ut quaerat aperiam, repudiandae harum ipsam nemo, eius quasi debitis pariatur in maiores quas tempora assumenda sit vel ex enim optio odit? Mollitia itaque aliquam omnis consequuntur! Amet mollitia iusto sint odit ipsa quis itaque enim, nesciunt aut maxime? Quod velit itaque dolorum hic!",
        createdAt: "2025-03-25T16:00:00Z",
        name: "Grace Martinez",
        image: "https://via.placeholder.com/150"
    },
    {
        id: 8,
        title: "Eighth Post",
        content: "Making sure everything displays properly.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ipsum amet commodi perspiciatis temporibus deserunt veritatis sit ut ex? Veniam architecto facere exercitationem quasi laudantium fugit, magni alias nobis porro nulla, natus ea ullam! Amet itaque iusto aut? Quaerat doloribus dolorem officia beatae, corrupti error incidunt exercitationem iste natus fugiat atque cupiditate. Nihil veniam ipsam reiciendis odio ea optio nostrum esse, molestias perspiciatis iure alias voluptatum, iste asperiores laboriosam provident aliquam cupiditate dignissimos ex repellat labore aut. Iste incidunt rerum nobis, eius omnis obcaecati modi totam, facere quis cupiditate eum enim repudiandae debitis sed fugit dicta voluptas perferendis fugiat quia qui similique. Adipisci rem unde earum qui, nobis odit? Quod numquam dolor et aut sit, ipsum nostrum beatae illo laboriosam eos eius voluptatem cumque doloremque. In, temporibus itaque est eum vitae beatae odit eligendi ipsa labore quo id magnam atque iure voluptate quasi nemo dolor velit dolorem nihil accusantium a aut perferendis blanditiis ad? Consectetur ratione ut quaerat aperiam, repudiandae harum ipsam nemo, eius quasi debitis pariatur in maiores quas tempora assumenda sit vel ex enim optio odit? Mollitia itaque aliquam omnis consequuntur! Amet mollitia iusto sint odit ipsa quis itaque enim, nesciunt aut maxime? Quod velit itaque dolorum hic!",
        createdAt: "2025-03-25T17:00:00Z",
        name: "Henry Taylor",
        image: "https://via.placeholder.com/150"
    },
    {
        id: 9,
        title: "Ninth Post",
        content: "Another test case for our data.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ipsum amet commodi perspiciatis temporibus deserunt veritatis sit ut ex? Veniam architecto facere exercitationem quasi laudantium fugit, magni alias nobis porro nulla, natus ea ullam! Amet itaque iusto aut? Quaerat doloribus dolorem officia beatae, corrupti error incidunt exercitationem iste natus fugiat atque cupiditate. Nihil veniam ipsam reiciendis odio ea optio nostrum esse, molestias perspiciatis iure alias voluptatum, iste asperiores laboriosam provident aliquam cupiditate dignissimos ex repellat labore aut. Iste incidunt rerum nobis, eius omnis obcaecati modi totam, facere quis cupiditate eum enim repudiandae debitis sed fugit dicta voluptas perferendis fugiat quia qui similique. Adipisci rem unde earum qui, nobis odit? Quod numquam dolor et aut sit, ipsum nostrum beatae illo laboriosam eos eius voluptatem cumque doloremque. In, temporibus itaque est eum vitae beatae odit eligendi ipsa labore quo id magnam atque iure voluptate quasi nemo dolor velit dolorem nihil accusantium a aut perferendis blanditiis ad? Consectetur ratione ut quaerat aperiam, repudiandae harum ipsam nemo, eius quasi debitis pariatur in maiores quas tempora assumenda sit vel ex enim optio odit? Mollitia itaque aliquam omnis consequuntur! Amet mollitia iusto sint odit ipsa quis itaque enim, nesciunt aut maxime? Quod velit itaque dolorum hic!",
        createdAt: "2025-03-25T18:00:00Z",
        name: "Isabella Moore",
        image: "https://via.placeholder.com/150"
    },
    {
        id: 10,
        title: "Tenth Post",
        content: "Last object in our sample array.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ipsum amet commodi perspiciatis temporibus deserunt veritatis sit ut ex? Veniam architecto facere exercitationem quasi laudantium fugit, magni alias nobis porro nulla, natus ea ullam! Amet itaque iusto aut? Quaerat doloribus dolorem officia beatae, corrupti error incidunt exercitationem iste natus fugiat atque cupiditate. Nihil veniam ipsam reiciendis odio ea optio nostrum esse, molestias perspiciatis iure alias voluptatum, iste asperiores laboriosam provident aliquam cupiditate dignissimos ex repellat labore aut. Iste incidunt rerum nobis, eius omnis obcaecati modi totam, facere quis cupiditate eum enim repudiandae debitis sed fugit dicta voluptas perferendis fugiat quia qui similique. Adipisci rem unde earum qui, nobis odit? Quod numquam dolor et aut sit, ipsum nostrum beatae illo laboriosam eos eius voluptatem cumque doloremque. In, temporibus itaque est eum vitae beatae odit eligendi ipsa labore quo id magnam atque iure voluptate quasi nemo dolor velit dolorem nihil accusantium a aut perferendis blanditiis ad? Consectetur ratione ut quaerat aperiam, repudiandae harum ipsam nemo, eius quasi debitis pariatur in maiores quas tempora assumenda sit vel ex enim optio odit? Mollitia itaque aliquam omnis consequuntur! Amet mollitia iusto sint odit ipsa quis itaque enim, nesciunt aut maxime? Quod velit itaque dolorum hic!",
        createdAt: "2025-03-25T19:00:00Z",
        name: "Jack White",
        image: "https://via.placeholder.com/150"
    }
];

console.log(testData);

  return (
    <div>
      <CreatePlog/>
{
  testData.map((plog: IPlog) => <Plog key={plog.id} {...plog} />)  // map over the array and create a Plog component for each item in the array  // pass the plog object as a prop to the Plog component  // the key prop is required for React to identify which items have changed, are added, or are removed  // the key is typically a unique identifier for each item in the array  // in this case, we are using the id property of the plog object as the key  // the plog object is passed as a prop to the Plog component  // the Plog component is then responsible for rendering the content of the plog  // the Plog component will have access to the title, content, createdAt, name, and image properties from the plog object  // the Plog component can be styled using CSS or styled-components to customize its appearance and behavior  
}

    </div>
  )
}

export default HomePage;
