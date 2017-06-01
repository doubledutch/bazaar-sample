function run(req, rsp) {
    rsp.write(JSON.stringify(
        { status: 'INSTALLATION SUCCESS' }
    ))
}
