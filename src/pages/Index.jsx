import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CatBreed = ({ name, description, image }) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle>{name}</CardTitle>
    </CardHeader>
    <CardContent>
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-md mb-4" />
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, 50);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
};

const Index = () => {
  const catBreeds = [
    { name: "Siamese", description: "Known for their distinctive color points and blue eyes.", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
    { name: "Maine Coon", description: "One of the largest domesticated cat breeds with a distinctive physical appearance.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
    { name: "Persian", description: "Characterized by their round face and short muzzle.", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
    { name: "Bengal", description: "Known for their wild appearance and energetic personality.", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
    { name: "Sphynx", description: "Distinctive for their lack of coat (fur).", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="relative h-[60vh] bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl font-bold text-white mb-4"
            >
              All About Cats
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xl text-gray-200"
            >
              Discover the fascinating world of our feline friends
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="breeds">Cat Breeds</TabsTrigger>
            <TabsTrigger value="facts">Fun Facts</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>About Cats</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700">
                  Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their
                  independence, agility, and affectionate nature. Cats come in various breeds, each with its unique
                  characteristics and personalities.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {catBreeds.map((breed, index) => (
                  <CarouselItem key={index}>
                    <CatBreed {...breed} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsContent>
          <TabsContent value="facts">
            <Card>
              <CardHeader>
                <CardTitle>Cat Fun Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Cats spend <AnimatedCounter value="70" />% of their lives sleeping.</li>
                  <li>A group of cats is called a "clowder".</li>
                  <li>Cats have <AnimatedCounter value="230" /> bones in their body.</li>
                  <li>The first cat in space was a French cat named Felicette in 1963.</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Stay Updated</CardTitle>
            <CardDescription>Sign up for our newsletter to receive the latest cat news and tips!</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex gap-4">
              <Input type="email" placeholder="Enter your email" className="flex-grow" />
              <Button type="submit">Subscribe</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
