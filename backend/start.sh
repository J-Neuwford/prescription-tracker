#!/bin/bash
exec hypercorn -b 0.0.0.0:5000 app:app