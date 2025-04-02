import prisma from "../library/prisma.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
    }

export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await prisma.post.findUnique({
        where: { id },
        });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
    }

    export const addPost = async (req, res) => {
        const { postdata, postDetails } = req.body;
        const tokenUserId = req.userId;
        
        try {
          // Validate required fields
          if (!postdata?.title || !postdata?.price || !postdata?.city) {
            return res.status(400).json({ error: "Missing required fields (title, price, city)" });
          }
    
          // Check if title already exists
          const existingPost = await prisma.post.findUnique({
            where: { title: postdata.title }
          });
      
          if (existingPost) {
            return res.status(400).json({ 
              error: "Post title already exists",
              suggestion: "Please choose a different title"
            });
          }
      
          // Convert enum values to lowercase
          const type = postdata.type?.toLowerCase();
          const property = postdata.property?.toLowerCase();
          
          // Validate enum values
          if (!['buy', 'rent'].includes(type)) {
            return res.status(400).json({ error: "Invalid type value" });
          }
          
          if (!['house', 'apartment', 'condo', 'land'].includes(property)) {
            return res.status(400).json({ error: "Invalid property value" });
          }
    
          const newPost = await prisma.post.create({
            data: {
              title: postdata.title,
              price: Number(postdata.price),
              images: postdata.images || [], // Use ONLY images array (remove any reference to img)
              address: postdata.address || null,
              city: postdata.city,
              bedrooms: Number(postdata.bedrooms) || 1,
              bathrooms: Number(postdata.bathrooms) || 1,
              type,
              property,
              latitude: postdata.latitude || '0',
              longitude: postdata.longitude || '0',
              userId: tokenUserId,
              postDetails: {
                create: { 
                  ...postDetails,
                  size: Number(postDetails?.size) || 0,
                  school: Number(postDetails?.school) || 0,
                  bus: Number(postDetails?.bus) || 0,
                  restaurant: Number(postDetails?.restaurant) || 0
                }
              }
            },
            include: {
              postDetails: true
            }
          });
          
          res.status(201).json(newPost);
        } catch (error) {
          console.error("Post creation error:", error);
          res.status(500).json({ 
            error: "Failed to create post",
            details: error.message 
          });
        }
    }
    
export const updatePost = async (req, res) => {
    try {
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: "Failed to update post" });
    }
};

export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    try {
        const posts = await prisma.post.findUnique({
        where: { id },
        });

        if (posts.userId !== tokenUserId) {
            return res.status(403).json({ error: "You can only delete your own posts" });
        }

        await prisma.post.delete({
        where: { id },
        });

        res.status(200).json({message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete post" });
    }
    }

    