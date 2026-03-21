export function withHeaders(ctx, next) {
    console.log("creating headers");
    
    ctx.headers = new Headers();
    return next(ctx);
}