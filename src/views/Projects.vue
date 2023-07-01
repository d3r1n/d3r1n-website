<template>
    <div class="sc-page sc-flex-center">
        <BackButton name="Projects" class="absolute top-5 left-5" />

        <div class="content sc-flex-center w-9/10 gap-10 mt-25 mb-5 md:m-0">
            <div class="grid grid-cols-2 grid-row-3 gap-10">
                <Suspense>
                    <ProjectList />

                    <template #fallback>
                        <ProjectListSkeleton />
                    </template>
                </Suspense>
            </div>
        </div>
    </div>
</template>
