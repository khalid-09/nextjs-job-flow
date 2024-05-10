import { cache } from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import JobPage from "@/components/JobPage";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: {
    slug: string;
  };
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({ where: { slug } });
  if (!job) notFound();
  return job;
});

export const generateStaticParams = async () => {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    select: { slug: true },
  });

  return jobs.map(({ slug }) => slug);
};

export const generateMetadata = async ({
  params: { slug },
}: PageProps): Promise<Metadata> => {
  const job = await getJob(slug);
  return {
    title: `${job.title} at ${job.companyName}`,
  };
};

const Page = async ({ params: { slug } }: PageProps) => {
  const job = await getJob(slug);
  const { applicationEmail, applicationUrl } = job;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.error(`No application link or email found for job ${slug}`);
    notFound();
  }

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <aside>
        <Button asChild>
          <a href={applicationLink}>Apply Now</a>
        </Button>
      </aside>
    </main>
  );
};

export default Page;
