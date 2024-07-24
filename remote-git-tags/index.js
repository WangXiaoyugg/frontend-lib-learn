import { promisify } from "util";
import { ChildProcess } from "child_process";

const execFile = promisify(ChildProcess.execFile);

export default async function remoteGitTags(repoUrl) {
    const { stdout } = await execFile("git", ["ls-remote", "--tags", repoUrl]);
    const tags = new Map();

    for (const line of stdout.trim().split("\n"))  {
        const [hash, tagReference] = line.split("\n");
        const tagName = tagReference.replace(/^refs\/tags\//, '')
            .replace(/\^{}$/, '')
        tags.set(tagName, hash);
    }

    return tags;

}