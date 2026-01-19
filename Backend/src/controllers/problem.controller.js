import { checkStatus, getProblemById, getProblemsBySkill } from "../services/problem.service.js";



const getProblem = async(req,res)=>{

    try {
        const problemId=req.params.problemId;
        const problem=await getProblemById(problemId);
        res.status(200).json(problem);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
} 

const getProblemsUnderSkill = async(req,res)=>{

    try {
        console.log(req.user)
        const skillKey=req.params.skillKey;
        const problems=await getProblemsBySkill(skillKey,req.user.id);
        res.status(200).json(problems);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }   

}

const getStatus = async(req,res)=>{
    try {
        const {problemId}=req.params;
        const status=await checkStatus(req.user._id,problemId);
        res.status(200).json({status});
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
export { getProblem, getProblemsUnderSkill,getStatus };