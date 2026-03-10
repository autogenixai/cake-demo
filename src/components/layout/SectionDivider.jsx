import React from 'react'

export default function SectionDivider({ color = '#FDF6F0', flip = false, fromColor = 'transparent' }) {
    // When flipped, we reverse the wave direction by mirroring the path,
    // NOT by CSS transform (which breaks the rect fill positions)
    const topColor = fromColor
    const bottomColor = color

    return (
        <div
            style={{
                width: '100%',
                position: 'relative',
                zIndex: 15,
                marginTop: '-30px',
                marginBottom: '-30px',
                pointerEvents: 'none',
                lineHeight: 0,
                fontSize: 0,
            }}
        >
            <svg
                width="100%"
                height="60"
                viewBox="0 0 1440 60"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'block' }}
            >
                {/* Top half = previous section */}
                <rect x="0" y="0" width="1440" height="30" fill={topColor} />
                {/* Bottom half = next section */}
                <rect x="0" y="30" width="1440" height="30" fill={bottomColor} />

                {flip ? (
                    <>
                        {/* Flipped wave: peaks go DOWN instead of up */}
                        <path
                            d="M0,0 L1440,0 L1440,30 C1260,5 1080,55 900,30 C720,5 540,55 360,30 C180,5 60,45 0,30 Z"
                            fill={topColor}
                        />
                        <path
                            d="M0,30 C60,45 180,5 360,30 C540,55 720,5 900,30 C1080,55 1260,5 1440,30 L1440,60 L0,60 Z"
                            fill={bottomColor}
                        />
                    </>
                ) : (
                    <>
                        {/* Normal wave: peaks go UP */}
                        <path
                            d="M0,0 L1440,0 L1440,30 C1380,15 1260,55 1080,30 C900,5 720,55 540,30 C360,5 180,55 0,30 Z"
                            fill={topColor}
                        />
                        <path
                            d="M0,30 C180,55 360,5 540,30 C720,55 900,5 1080,30 C1260,55 1380,15 1440,30 L1440,60 L0,60 Z"
                            fill={bottomColor}
                        />
                    </>
                )}
            </svg>
        </div>
    )
}
