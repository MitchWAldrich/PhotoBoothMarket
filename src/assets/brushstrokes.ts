const brushStrokes = `
uniform shader u_Texture;
uniform float u_Radius;
uniform float u_Seed;
uniform float u_Width;
uniform float u_Height;

float rand(float2 co) {
    return fract(sin(dot(co.xy, float2(12.9898, 78.233))) * 43758.5453 + u_Seed);
}

half4 main(float2 coord) {
    const int samples = 20;

    float2 texel = float2(1.0 / u_Width, 1.0 / u_Height);
    half3 sum = half3(0.0);
    float weight = 0.0;

    float angle;
    float radius;
    float2 offset;
    float w;

    for (int i = 0; i < samples; i++) {
        angle = rand(coord + float2(float(i), u_Seed)) * 6.2831853;
        radius = rand(coord + float2(float(i) + 10.0, u_Seed)) * u_Radius;

        offset = float2(cos(angle), sin(angle) * 0.5) * radius * texel;  // Skewed stroke
        w = max(0.0, 1.0 - radius / u_Radius);

        sum += u_Texture.eval(coord + offset).rgb * w;
        weight += w;
    }

    half3 color = sum / weight;

    // Posterize color
    float levels = 8.2;
    color = floor(color * levels) / levels;

    // Optional: add subtle noise
    float noise = rand(coord) * 0.05;
    color += noise;
    color = clamp(color, 0.0, 1.0);

    return half4(color, 1.0);
}
`;

export default brushStrokes;
