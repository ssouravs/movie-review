import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();


//create a movie
export const createMovie= async (req:Request,res:Response)=>{
    const { movieName,releaseDate,avgRating} =req.body;
    try{
        const newMovie= await prisma.movies.create({
            data:
            { 
                movie_name:movieName,
                release_date: releaseDate,
                avg_rating:avgRating !==undefined?avgRating:null,
            },
        });
        res.json(newMovie);
    }catch(error){
        console.error("Error creating movie:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

//Get movies
export const getMovies=async (_:Request,res:Response)=>{
    const movies = await prisma.movies.findMany();
    res.json(movies);
}

//update movies
export const updateMovie= async (req:Request,res:Response)=>{
    const { id } = req.params;
    const { name, releaseDate, averageRating } = req.body;
    const updatedMovie = await prisma.movies.update({
      where: { movie_id: parseInt(id) },
      data: { movie_name: name,release_date: releaseDate, avg_rating:averageRating },
    });
    res.json(updatedMovie);
}

//delete a movie
export const deleteMovie = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      // Find the movie
      const movie = await prisma.movies.findUnique({
        where: { movie_id: parseInt(id) },
      });
  
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
  
      
      // Manually delete associated reviews
      await prisma.reviews.deleteMany({
        where: { movieId: parseInt(id, 10) },
      });

      // Delete the movie
      await prisma.movies.delete({
        where: { movie_id: parseInt(id, 10) },
      });
  
  
      res.json({ message: 'Movie and associated reviews deleted successfully' });
    } catch (error) {
      console.error('Error deleting movie and reviews:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


//search a movie
export const searchMovies = async (req: Request, res: Response) => {
    try {
      const { keyword } = req.query;
  
      if (!keyword || typeof keyword !== 'string') {
        return res.status(400).json({ error: 'Invalid keyword parameter' });
      }
  
      const movies = await prisma.movies.findMany({
        where: {
          OR: [
            { movie_name: { contains: keyword.toLowerCase() } },
          { release_date: { contains: keyword.toLowerCase() } },
          ],
        },
      });
  
      res.json(movies);
    } catch (error) {
      console.error('Error searching movies:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };