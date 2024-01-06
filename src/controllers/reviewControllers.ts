import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


// Implementation for creating a review
export const createReview = async (req: Request, res: Response) => {
  
    const { reviewer_name, rating, review_text, movieId } = req.body;
    try {
      const newReview = await prisma.reviews.create({
        data: {
          reviewer_name,
          rating,
          review_text,
          movieId,
        },
        /*review_id     Int     @id @default(autoincrement())
  reviewer_name String?
  rating        Int
  review_text   String
  movieId Int 
        */
      });
      res.json(newReview);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }

};


// Implementation for getting reviews
export const getReviews = async (_: Request, res: Response) => {
    try {
        const reviews = await prisma.reviews.findMany();
        res.json(reviews);
      } catch (error) {
        console.error("Error getting reviews:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
};

// Update a review
export const updateReview = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { reviewer_name, rating, review_text, movieId } = req.body;
    try {
      const updatedReview = await prisma.reviews.update({
        where: { review_id: parseInt(id, 10) },
        data: {
          reviewer_name,
          rating,
          review_text,
          movieId,
        },
      });
      res.json(updatedReview);
    } catch (error) {
      console.error("Error updating review:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }


};

//delete a review
export const deleteReview = async (req: Request, res: Response) => {
  
const { id } = req.params;
  try {
    const deletedReview = await prisma.reviews.delete({
      where: { review_id: parseInt(id, 10) },
    });
    res.json(deletedReview);
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

};


//search a review

export const searchReviews = async (req: Request, res: Response) => {
    try {
      const { keyword } = req.query;
  
      if (!keyword || typeof keyword !== 'string') {
        return res.status(400).json({ error: 'Invalid keyword parameter' });
      }
  
      const reviews = await prisma.reviews.findMany({
        where: {
          OR: [
            { reviewer_name: { contains: keyword.toLowerCase() } },
            { review_text: { contains: keyword.toLowerCase() } },
          ],
        },
      });
  
      res.json(reviews);
    } catch (error) {
      console.error('Error searching reviews:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };