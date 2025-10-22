import express from "express";
import { prisma } from "../config";
import z from "zod";
export const ProfileRouter = express.Router();

/**
model project {
  id          String  
  title       String
  image       String
  description String
  link        String

}
*/

const projectSchema = z.object({
  title: z.string().min(2).max(100),
  image: z.string().url(),
  description: z.string().max(500),
  link: z.string().url(),
});

/**
model achievement {
  id          String  
  title       String
  description String
  date        String
}
*/
const achievementSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().max(500),
  date: z.string().min(10).max(10),
});
/**
model skill {
  id        String  
  name      String
  level     Int
}
 */

const skillSchema = z.object({
  name: z.string().min(1).max(50),
  level: z.number().min(1).max(10),
});

/**
 * model profile {
  id          String 
  name        String
  avatar      String
  description String
  projects    project[]
  achievements achievement[]
  skills      skill[]
}
*/
const profileSchema = z.object({
  name: z.string().min(1).max(100),
  avatar: z.string().url(),
  description: z.string().max(500),
  projects: z.array(projectSchema),
  achievements: z.array(achievementSchema),
  skills: z.array(skillSchema),
});

ProfileRouter.get("/", async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    const profile = await prisma.profile.findUnique({
      where: { userId: userId },
    });
    if (!user || !profile) {
      res.status(404).json({ msg: "Profile not found" });
      return;
    }
    res.json({
      email: user.email,
      ...profile,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

//TODO: project achievement or any other features should be an separate route to manage crud operations individually
ProfileRouter.post("/", async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const result = profileSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ msg: "Invalid profile data", errors: result.error });
    return;
  }
  try {
    const updatedProfile = await prisma.profile.create({
      data: {
        name: result.data.name,
        avatar: result.data.avatar,
        description: result.data.description,
        user: {
          connect: { id: userId }, // connect to existing user
        },
        projects: {
          create: result.data.projects, // 👈 wrap with "create"
        },
        achievements: {
          create: result.data.achievements, // 👈 wrap with "create"
        },
        skills: {
          create: result.data.skills, // 👈 wrap with "create"
        },
      },
    });
    res.json({ msg: "Profile created/updated successfully", profile: updatedProfile });
  } catch (error) {
    console.error("Error creating/updating profile:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

ProfileRouter.post(":id/projects/", async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const profileId = req.params.id;
  const result = projectSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ msg: "Invalid project data", errors: result.error });
    return;
  }
  const newProject = await prisma.project.create({
    data: {
      ...result.data,
      profile: { connect: { id: profileId } },
    },
  });
  res.json({ msg: "Project created successfully", project: newProject });
});


ProfileRouter.post(":id/achievements/", async (req, res) => {
	//@ts-ignore
	const userId = req.userId;
	const profileId = req.params.id;
	const result = achievementSchema.safeParse(req.body);
	if (!result.success) {
		res.status(400).json({ msg: "Invalid achievement data", errors: result.error });
		return;
	}
	try{

	const newAchievement = await prisma.achievement.create({
		data: {
			...result.data,
			profile: { connect: { id: profileId } },
		},
	});
	res.json({ msg: "Achievement created successfully", achievement: newAchievement });
}catch(error){
	console.error("Error creating achievement:", error);
		res.status(500).json({ msg: "Internal server error" });		
}
});

ProfileRouter.post(":id/skills/", async (req, res) => {
	//@ts-ignore
	const userId = req.userId;
	const profileId = req.params.id;
	const result = skillSchema.safeParse(req.body);
	if (!result.success) {
		res.status(400).json({ msg: "Invalid skill data", errors: result.error });
		return;
	}
	try{
		const newSkill = await prisma.skill.create({
			data: {
				...result.data,
				profile: { connect: { id: profileId } },
			},
		});
		res.json({ msg: "Skill created successfully", skill: newSkill });
	}catch(error){
		console.error("Error creating skill:", error);
		res.status(500).json({ msg: "Internal server error" });
	}
});

// TODO: update routes here
// TODO: delete routes here