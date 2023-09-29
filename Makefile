LOCAL-BIN ?= $(HOME)/.local/bin

build: prepare
	pnpm run build

prepare:
	pnpm install

install: build
	cp dist/index.js /usr/local/bin/

local-install: build
	[ -d "$(LOCAL-BIN)" ] || mkdir "$(LOCAL-BIN)"
	cp dist/index.js "$(LOCAL-BIN)/means"
