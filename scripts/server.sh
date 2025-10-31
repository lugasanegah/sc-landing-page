#!/bin/bash

# Server Management Script for SocialCrab Landing Page
# Usage: ./scripts/server.sh [start|stop|restart|status|dev|prod]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PORT=${PORT:-5000}
HOST=${HOST:-0.0.0.0}
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

# Function to check if port is in use
check_port() {
    if lsof -i :$PORT > /dev/null 2>&1; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

# Function to get process ID using port
get_pid_by_port() {
    lsof -ti :$PORT 2>/dev/null || echo ""
}

# Function to kill process by PID
kill_process() {
    local pid=$1
    if [ -n "$pid" ]; then
        print_status "Killing process $pid on port $PORT"
        kill $pid
        sleep 2
        if kill -0 $pid 2>/dev/null; then
            print_warning "Process $pid still running, force killing..."
            kill -9 $pid
        fi
    fi
}

# Function to start development server
start_dev() {
    print_header "Starting Development Server"
    
    if check_port; then
        print_warning "Port $PORT is already in use"
        local pid=$(get_pid_by_port)
        if [ -n "$pid" ]; then
            read -p "Do you want to kill the existing process? (y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                kill_process $pid
            else
                print_error "Cannot start server. Port $PORT is in use."
                exit 1
            fi
        fi
    fi
    
    print_status "Starting development server on $HOST:$PORT"
    cd "$PROJECT_DIR"
    npm run dev
}

# Function to start production server
start_prod() {
    print_header "Starting Production Server"
    
    if check_port; then
        print_warning "Port $PORT is already in use"
        local pid=$(get_pid_by_port)
        if [ -n "$pid" ]; then
            read -p "Do you want to kill the existing process? (y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                kill_process $pid
            else
                print_error "Cannot start server. Port $PORT is in use."
                exit 1
            fi
        fi
    fi
    
    print_status "Building project..."
    cd "$PROJECT_DIR"
    npm run build
    
    print_status "Starting production server on $HOST:$PORT"
    npm run start
}

# Function to stop server
stop_server() {
    print_header "Stopping Server"
    
    if ! check_port; then
        print_warning "No server running on port $PORT"
        return
    fi
    
    local pid=$(get_pid_by_port)
    if [ -n "$pid" ]; then
        kill_process $pid
        print_status "Server stopped successfully"
    else
        print_error "Could not find process on port $PORT"
    fi
}

# Function to restart server
restart_server() {
    print_header "Restarting Server"
    stop_server
    sleep 2
    start_prod
}

# Function to show server status
show_status() {
    print_header "Server Status"
    
    if check_port; then
        local pid=$(get_pid_by_port)
        if [ -n "$pid" ]; then
            print_status "Server is running on port $PORT (PID: $pid)"
            
            # Check if it's development or production
            if ps -p $pid -o args= | grep -q "tsx"; then
                print_status "Mode: Development"
            else
                print_status "Mode: Production"
            fi
            
            # Show memory usage
            local memory=$(ps -p $pid -o rss= 2>/dev/null | awk '{print $1/1024 " MB"}' || echo "Unknown")
            print_status "Memory usage: $memory"
        fi
    else
        print_warning "No server running on port $PORT"
    fi
    
    # Show environment
    print_status "Environment: ${NODE_ENV:-development}"
    print_status "Port: $PORT"
    print_status "Host: $HOST"
}

# Function to show help
show_help() {
    echo "Server Management Script for SocialCrab Landing Page"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  start     Start production server (build + start)"
    echo "  stop      Stop server running on port $PORT"
    echo "  restart   Restart production server"
    echo "  status    Show server status"
    echo "  dev       Start development server"
    echo "  prod      Start production server"
    echo "  help      Show this help message"
    echo ""
    echo "Environment variables:"
    echo "  PORT      Server port (default: 5000)"
    echo "  HOST      Server host (default: 0.0.0.0)"
    echo "  NODE_ENV  Node environment (development/production)"
    echo ""
    echo "Examples:"
    echo "  $0 dev          # Start development server"
    echo "  $0 prod         # Start production server"
    echo "  $0 stop         # Stop server"
    echo "  PORT=3000 $0 start  # Start on port 3000"
}

# Main script logic
case "${1:-help}" in
    "start"|"prod")
        start_prod
        ;;
    "dev")
        start_dev
        ;;
    "stop")
        stop_server
        ;;
    "restart")
        restart_server
        ;;
    "status")
        show_status
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac 