import dotenv from 'dotenv';
dotenv.config();
import  User  from './user.js';
import  Skill from './skills.js';
import SkillMap from './skillmap.js';
User.belongsToMany(Skill, { foreignKey: 'userid' ,through: SkillMap});
Skill.belongsToMany(User, { foreignKey: 'skillid', through: SkillMap});
export { User, Skill, SkillMap };