import { PortableTextBlock } from "sanity";
import { Tool } from "./Tool";

export type Project = {
  _id: string;
  _createdAt: Date;
  name: string;
  slug: string;
  image: string;
  url: string;
  content: PortableTextBlock[];
  tools: Tool[];
  repo: string;
};
