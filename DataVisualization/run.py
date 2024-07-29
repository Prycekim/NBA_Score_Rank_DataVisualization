import subprocess

process = subprocess.Popen(["python", "start_server.py"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
print('start:server:flask')

# 实时打印子进程的输出
try:
    while True:
        output = process.stdout.readline()
        if output == '' and process.poll() is not None:
            break
        if output:
            print(output.strip())
except KeyboardInterrupt:
    print("Terminating the Flask server...")
    process.terminate()
    process.wait()
    print("Flask server terminated.")