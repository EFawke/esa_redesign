import { BuildPage } from "@/app/ui/build/BuildPage";
import { Flex, Container } from "@radix-ui/themes";
import { cookies } from "next/headers";
import { DEFAULT_SETTINGS, type BuildSettings } from "../utils/user_settings";
import { Toast } from "radix-ui";

export default async function Page() {
    const cookieStore = await cookies();
    let buildSettings = cookieStore.get("buildSettings");
    const settings: BuildSettings =
        buildSettings === undefined
            ? DEFAULT_SETTINGS
            : JSON.parse(buildSettings.value);

    return (
        <Flex mt="1" direction="column">
            <Container px={{ initial: "4", sm: "6" }} mb="9" mt="9">
                <Flex direction="column" gap="7" align="start">
                    <Toast.Provider swipeDirection="right">
                        <BuildPage saved={settings} />
                        <Toast.Viewport className="ToastViewport" />
                    </Toast.Provider>
                </Flex>
            </Container>
        </Flex>
    );
}
