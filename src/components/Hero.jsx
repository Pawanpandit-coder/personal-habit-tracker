import React from 'react'
import { Button } from "@/components/ui/button";
import Image from 'next/image';

export default function Hero() {
    return (

        <div className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-background px-6">

            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/background_abstract_image_02.png"
                    alt="Background"
                    fill
                    priority
                    className="object-fit blur-xs scale-110 w-full"
                />
            </div>

            {/* Optional white overlay */}
            <div className="absolute inset-0 bg-background/50"></div>

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-6xl text-center w-full">
                <span className="inline-block rounded-full border bg-muted px-4 py-1 text-md text-muted-foreground">
                    ⚓ Welcome to Recalit
                </span>

                <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                    Enhance Your Cognitive function
                    <span className="block text-primary">
                        Faster than Ever
                    </span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                    Create Recalls, Write Journals, and remarks your research.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                    <Button size="lg">Get Started</Button>
                    <Button variant="outline" size="lg">
                        Learn More
                    </Button>
                </div>
            </div>
        </div>
    );
}

