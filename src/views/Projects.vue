<template>
    <div class="sc-page sc-flex-center">
        <BackButton name="Projects" class="absolute left-5 top-5" />

        <div class="content sc-flex-center w-9/10 mt-25 mb-5 gap-10">
            <div class="grid grid-cols-1 gap-10 md:grid-cols-2">
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
