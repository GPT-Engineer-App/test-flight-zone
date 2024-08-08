import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Paw, Heart, Star } from "lucide-react";

const CatBreed = ({ name, description, image }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Card className="h-full overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Paw className="w-5 h-5 mr-2 text-purple-500" />
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <img src={image} alt={name} className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-110" />
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
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
  const [activeBreed, setActiveBreed] = useState(0);
  const catBreeds = [
    { name: "Siamese", description: "Known for their distinctive color points and blue eyes.", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
    { name: "Maine Coon", description: "One of the largest domesticated cat breeds with a distinctive physical appearance.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
    { name: "Persian", description: "Characterized by their round face and short muzzle.", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
    { name: "Bengal", description: "Known for their wild appearance and energetic personality.", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
    { name: "Sphynx", description: "Distinctive for their lack of coat (fur).", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBreed((prev) => (prev + 1) % catBreeds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [catBreeds.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="relative h-[80vh] bg-cover bg-center overflow-hidden" style={{backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-7xl font-bold text-white mb-4"
            >
              All About Cats
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-2xl text-gray-200"
            >
              Discover the fascinating world of our feline friends
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <Button size="lg" className="mt-8 bg-purple-600 hover:bg-purple-700">
                Explore Now
              </Button>
            </motion.div>
          </div>
        </div>
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-100 to-transparent"
          initial={{ y: 32 }}
          animate={{ y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Tabs defaultValue="overview" className="mb-16">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="breeds">Cat Breeds</TabsTrigger>
              <TabsTrigger value="facts">Fun Facts</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center">
                    <Heart className="w-8 h-8 mr-2 text-red-500" />
                    About Cats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their
                    independence, agility, and affectionate nature. Cats come in various breeds, each with its unique
                    characteristics and personalities. These elegant felines have captured the hearts of millions around the world
                    with their playful antics and soothing purrs.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="breeds">
              <div className="relative">
                <Carousel className="w-full max-w-3xl mx-auto">
                  <CarouselContent>
                    <AnimatePresence mode="wait">
                      {catBreeds.map((breed, index) => (
                        <CarouselItem key={index}>
                          {activeBreed === index && (
                            <motion.div
                              key={breed.name}
                              initial={{ opacity: 0, x: 50 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -50 }}
                              transition={{ duration: 0.5 }}
                            >
                              <CatBreed {...breed} />
                            </motion.div>
                          )}
                        </CarouselItem>
                      ))}
                    </AnimatePresence>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {catBreeds.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-3 h-3 rounded-full ${activeBreed === index ? 'bg-purple-600' : 'bg-gray-300'}`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="facts">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center">
                    <Star className="w-8 h-8 mr-2 text-yellow-500" />
                    Cat Fun Facts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <motion.li
                      className="flex items-center text-lg"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Badge variant="outline" className="mr-2 bg-blue-100 text-blue-800">Fact 1</Badge>
                      Cats spend <AnimatedCounter value="70" />% of their lives sleeping.
                    </motion.li>
                    <motion.li
                      className="flex items-center text-lg"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Badge variant="outline" className="mr-2 bg-green-100 text-green-800">Fact 2</Badge>
                      A group of cats is called a "clowder".
                    </motion.li>
                    <motion.li
                      className="flex items-center text-lg"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Badge variant="outline" className="mr-2 bg-purple-100 text-purple-800">Fact 3</Badge>
                      Cats have <AnimatedCounter value="230" /> bones in their body.
                    </motion.li>
                    <motion.li
                      className="flex items-center text-lg"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Badge variant="outline" className="mr-2 bg-red-100 text-red-800">Fact 4</Badge>
                      The first cat in space was a French cat named Felicette in 1963.
                    </motion.li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Card className="mb-8 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardTitle className="text-3xl">Stay Updated</CardTitle>
              <CardDescription className="text-gray-100">Sign up for our newsletter to receive the latest cat news and tips!</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form className="flex gap-4">
                <Input type="email" placeholder="Enter your email" className="flex-grow text-lg" />
                <Button type="submit" size="lg" className="bg-purple-600 hover:bg-purple-700">Subscribe</Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
