import { Flex, Container, Heading } from "@radix-ui/themes";
import {namesAndIds} from "@/app/utils/namesAndIds";
import { AnalysisPageContent } from "@/app/ui/analysis/AnalysisPageContent";
import { notFound } from 'next/navigation'

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const slug = await params;
    const id = slug.id;
    const name = namesAndIds.find((item) => item.id === Number(id))?.name;

    if(!name){
        // return a 404 page 
        notFound();
    }

    return (
        <Flex mt="1" direction="column">
            <Container px={{ initial: "4", sm: "6" }} mb="9" mt="9">
                <Flex direction="column" gap="7" align="start">
                    <Flex gap="1" direction="column" className="appear_on_load">
                        <Heading weight="light" style={{ color: "var(--accent-a11)" }}><i>{name}</i></Heading>
                    </Flex>
                    <AnalysisPageContent id={Number(id)}/>
                </Flex>
            </Container>
        </Flex>
    );
}
