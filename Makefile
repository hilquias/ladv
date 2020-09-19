LUA=luajit

HTTPD=httpd

-include .env

run-cli:
	$(LUA) app/cli.lua src/WUMPUS.lua

run-web: | dist
	$(HTTPD) dist

dist:
	mkdir -p dist/lua
	cp -r app dist/lua/
	cp -r lib dist/lua/
	cp -r src dist/lua/

clean:
	rm -rf dist

.PHONY: run-cli run-web clean
